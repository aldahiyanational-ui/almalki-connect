import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// App content to search through
const appContent = {
  pages: [
    { title: "الرئيسية", path: "/", keywords: ["الصفحة الرئيسية", "المدارس", "مجموعة المالكي"] },
    { title: "لوحة التحكم", path: "/dashboard", keywords: ["لوحة التحكم", "الملخص", "الأبناء"] },
    { title: "الجدول الدراسي", path: "/schedule", keywords: ["الجدول", "المواعيد", "الحصص", "الفصول"] },
    { title: "الحضور والغياب", path: "/attendance", keywords: ["الحضور", "الغياب", "التأخر"] },
    { title: "الواجبات المنزلية", path: "/homework", keywords: ["الواجبات", "الفروض", "التسليم"] },
    { title: "الاختبارات", path: "/exams", keywords: ["الاختبارات", "الامتحانات", "الدرجات", "النتائج"] },
    { title: "الرسوم الدراسية", path: "/fees", keywords: ["الرسوم", "المدفوعات", "الأقساط", "الفواتير"] },
    { title: "المكتبة الرقمية", path: "/library", keywords: ["المكتبة", "الكتب", "المراجع", "الفيديوهات"] },
    { title: "الأنشطة", path: "/activities", keywords: ["الأنشطة", "الفعاليات", "النوادي"] },
    { title: "النقل المدرسي", path: "/transport", keywords: ["النقل", "الباص", "المواصلات", "السائق"] },
    { title: "الرسائل", path: "/messages", keywords: ["الرسائل", "التواصل", "المعلمين"] },
    { title: "الأخبار", path: "/news", keywords: ["الأخبار", "الإعلانات", "المستجدات"] },
    { title: "الإعدادات", path: "/settings", keywords: ["الإعدادات", "الحساب", "اللغة"] },
    { title: "تواصل معنا", path: "/contact", keywords: ["تواصل", "الدعم", "المساعدة"] },
  ],
  schools: [
    { name: "مدارس أجيال الخليج العالمية", id: "ajiyal", keywords: ["أجيال", "الخليج", "العالمية"] },
    { name: "مدارس قناديل المعرفة العالمية", id: "qanadeel", keywords: ["قناديل", "المعرفة", "العالمية"] },
    { name: "مدارس الضاحية الأهلية - بنين", id: "dahiya-boys", keywords: ["الضاحية", "بنين", "الأهلية"] },
    { name: "مدارس الضاحية الأهلية - بنات", id: "dahiya-girls", keywords: ["الضاحية", "بنات", "الأهلية"] },
  ],
  features: [
    { name: "متابعة الحضور اليومي", description: "تتبع حضور وغياب الطالب بشكل يومي" },
    { name: "الواجبات والتسليم", description: "عرض الواجبات المطلوبة ومواعيد التسليم" },
    { name: "نتائج الاختبارات", description: "عرض درجات ونتائج الاختبارات" },
    { name: "الرسوم والمدفوعات", description: "متابعة الرسوم الدراسية والدفع الإلكتروني" },
    { name: "التواصل مع المعلمين", description: "إرسال واستقبال الرسائل مع المعلمين" },
    { name: "تتبع الباص", description: "تتبع موقع الباص المدرسي" },
  ],
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query || query.trim().length < 2) {
      return new Response(
        JSON.stringify({ results: [], message: "الرجاء إدخال كلمة بحث" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create AI prompt for smart search
    const systemPrompt = `أنت مساعد بحث ذكي لتطبيق مدرسي. مهمتك هي:
1. تحليل استفسار المستخدم وفهم ما يبحث عنه
2. إرجاع نتائج بحث مرتبة حسب الصلة
3. تقديم اقتراحات مفيدة

محتوى التطبيق المتاح:
- الصفحات: ${JSON.stringify(appContent.pages)}
- المدارس: ${JSON.stringify(appContent.schools)}
- الميزات: ${JSON.stringify(appContent.features)}

أرجع النتائج بتنسيق JSON مع الحقول التالية:
- results: مصفوفة من النتائج، كل نتيجة تحتوي على: type (page/school/feature), title, description, path (إذا وجد), relevance (1-100)
- suggestion: اقتراح واحد مفيد للمستخدم`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `ابحث عن: ${query}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_search_results",
              description: "إرجاع نتائج البحث الذكي",
              parameters: {
                type: "object",
                properties: {
                  results: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string", enum: ["page", "school", "feature"] },
                        title: { type: "string" },
                        description: { type: "string" },
                        path: { type: "string" },
                        relevance: { type: "number" },
                      },
                      required: ["type", "title", "description", "relevance"],
                    },
                  },
                  suggestion: { type: "string" },
                },
                required: ["results", "suggestion"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_search_results" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "تم تجاوز حد الطلبات، يرجى المحاولة لاحقاً" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "يرجى إضافة رصيد للاستمرار" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (toolCall && toolCall.function.arguments) {
      const searchResults = JSON.parse(toolCall.function.arguments);
      return new Response(
        JSON.stringify(searchResults),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fallback to basic search if AI fails
    const basicResults = performBasicSearch(query, appContent);
    return new Response(
      JSON.stringify({ results: basicResults, suggestion: "جرب البحث بكلمات مختلفة" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Smart search error:", error);
    return new Response(
      JSON.stringify({ error: "حدث خطأ في البحث" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function performBasicSearch(query: string, content: typeof appContent) {
  const results: any[] = [];
  const lowerQuery = query.toLowerCase();

  // Search pages
  content.pages.forEach((page) => {
    if (
      page.title.includes(query) ||
      page.keywords.some((k) => k.includes(query) || query.includes(k))
    ) {
      results.push({
        type: "page",
        title: page.title,
        description: `انتقل إلى صفحة ${page.title}`,
        path: page.path,
        relevance: 80,
      });
    }
  });

  // Search schools
  content.schools.forEach((school) => {
    if (
      school.name.includes(query) ||
      school.keywords.some((k) => k.includes(query) || query.includes(k))
    ) {
      results.push({
        type: "school",
        title: school.name,
        description: "اضغط لعرض تفاصيل المدرسة",
        path: `/school/${school.id}`,
        relevance: 90,
      });
    }
  });

  // Search features
  content.features.forEach((feature) => {
    if (feature.name.includes(query) || feature.description.includes(query)) {
      results.push({
        type: "feature",
        title: feature.name,
        description: feature.description,
        relevance: 70,
      });
    }
  });

  return results.sort((a, b) => b.relevance - a.relevance);
}
