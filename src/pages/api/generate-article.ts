import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // --- GATE 1 & 2: Autentikasi & Otorisasi (Hanya Admin Epigrap) ---
    const auth = locals.auth();
    
    if (!auth.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Harap login terlebih dahulu.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const metadata = (auth.sessionClaims?.metadata as { role?: string })
      || (auth.sessionClaims?.publicMetadata as { role?: string })
      || {};
    const role = metadata?.role;
    if (role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Forbidden: Hanya tim internal Epigrap yang dapat diizinkan menggunakan fitur AI ini.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // -------------------------------------------------------------

    const body = await request.json();
    const { namaArtefak, slogan, deskripsi, tema } = body;

    if (!namaArtefak) {
      return new Response(JSON.stringify({ error: 'Nama artefak wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = import.meta.env.GITHUB_TOKEN;

    if (!token) {
      return new Response(JSON.stringify({ error: 'GITHUB_TOKEN belum dikonfigurasi di .env' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const temaMap: Record<string, string> = {
      budaya: 'wisata budaya, tugu, atau monumen daerah',
      formal: 'pejabat pemerintah, monumen negara, atau bangunan resmi',
      religius: 'pesantren, masjid, atau lembaga keagamaan',
      memorial: 'nisan, makam, atau peringatan mendiang',
      klasik: 'bongpay, prasasti tradisi Tionghoa, atau warisan klasik',
    };

    const konteksTema = temaMap[tema] || temaMap.budaya;

    const systemPrompt = `Kamu adalah penulis sejarah dan budaya Indonesia yang sangat berpengalaman. Tugasmu adalah menulis artikel profil untuk ${konteksTema}. Gaya penulisan: naratif, mendalam, informatif, bernada bangga dan menghargai warisan budaya. Gunakan bahasa Indonesia yang indah dan formal namun tetap mudah dipahami wisatawan. Artikel harus memiliki struktur: pembukaan yang memikat, sejarah/latar belakang, makna filosofis, kondisi terkini, dan penutup yang menginspirasi. Panjang artikel: 4-6 paragraf.`;

    const userPrompt = `Buatkan artikel profil untuk artefak/monumen bernama: "${namaArtefak}".${slogan ? ` Slogan/jargon: "${slogan}".` : ''}${deskripsi ? ` Deskripsi singkat: "${deskripsi}".` : ''} Kategori: ${konteksTema}. Tulis artikel yang lengkap dan menarik.`;

    const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Azure AI Error:', errText);
      return new Response(JSON.stringify({ error: `Azure AI error: ${response.status}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const articleText = data.choices?.[0]?.message?.content || '';

    // Konversi teks mentah menjadi Portable Text blocks
    const paragraphs = articleText.split('\n').filter((p: string) => p.trim() !== '');
    const portableTextBlocks = paragraphs.map((paragraph: string, index: number) => {
      const isHeading = paragraph.startsWith('##') || paragraph.startsWith('# ');
      const cleanText = paragraph.replace(/^#+\s*/, '').replace(/\*\*/g, '');

      if (isHeading) {
        return {
          _type: 'block',
          _key: `ai_block_${index}`,
          style: 'h2',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: `ai_span_${index}`,
              text: cleanText,
              marks: [],
            },
          ],
        };
      }

      return {
        _type: 'block',
        _key: `ai_block_${index}`,
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: `ai_span_${index}`,
            text: cleanText,
            marks: [],
          },
        ],
      };
    });

    return new Response(JSON.stringify({ blocks: portableTextBlocks, raw: articleText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Generate article error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
