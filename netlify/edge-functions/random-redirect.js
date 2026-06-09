/**
 * Netlify Edge Function — 根据设备类型随机重定向图片。
 * 通过 User-Agent 判断手机端 / 电脑端，自动选择对应比例的图片：
 *   手机端 → 竖屏图片 (portrait, h > w)
 *   电脑端 → 横屏图片 (landscape, w > h)
 *   方形图片同时加入两端
 */
export default async (request, context) => {
  const userAgent = request.headers.get("User-Agent") || "";

  const isMobile = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(userAgent);

  // 竖屏图片 — 适合手机端 (13 张)
  const mobileUrls = [
    'https://wpapi.lwzmc1437.cn/Webp/102912132_p0.webp',    // 2591x3624
    'https://wpapi.lwzmc1437.cn/Webp/102912141_p0.webp',    // 1614x2258
    'https://wpapi.lwzmc1437.cn/Webp/102912160_p0.webp',    // 2591x3624
    'https://wpapi.lwzmc1437.cn/Webp/107465767_p0.webp',    // 1785x3500
    'https://wpapi.lwzmc1437.cn/Webp/137803884_p0.webp',    // 2160x3840
    'https://wpapi.lwzmc1437.cn/Webp/16903028_p0.webp',     // 1060x1300
    'https://wpapi.lwzmc1437.cn/Webp/19033617_p0.webp',     // 491x600
    'https://wpapi.lwzmc1437.cn/Webp/33842921925d32fca6d98f04ee0b444e2c9e971d.webp', // 2480x3507
    'https://wpapi.lwzmc1437.cn/Webp/40071493_p0.webp',     // 730x1032
    'https://wpapi.lwzmc1437.cn/Webp/48824031_p0.webp',     // 1000x1294
    'https://wpapi.lwzmc1437.cn/Webp/63071289_p0.webp',     // 2100x2700
    'https://wpapi.lwzmc1437.cn/Webp/84677079_p0.webp',     // 1200x1750
    'https://wpapi.lwzmc1437.cn/Webp/84843716_p0.webp',     // 2894x4093
    'https://wpapi.lwzmc1437.cn/Webp/19004863_p0.webp',     // 596x600 方形
  ];

  // 横屏图片 — 适合电脑端 (25 张)
  const desktopUrls = [
    'https://wpapi.lwzmc1437.cn/Webp/0d9efb5a2fca6440b7d7f348571b9d7bfc2644b2.webp',  // 1125x800
    'https://wpapi.lwzmc1437.cn/Webp/13bdfa7bcaad054e1d38fdf04cf1cc507a18b95c.webp',   // 1325x1028
    'https://wpapi.lwzmc1437.cn/Webp/20251023_000324-kkof.webp',                        // 1000x759
    'https://wpapi.lwzmc1437.cn/Webp/c8ae96107fbdc1d46993215d5c69902babb06aa7.webp',    // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/background-4.webp',                                // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/b52a2ae589530aa9c57e5b725b689c3420ff1e17.webp',    // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/background-2.webp',                                // 1800x1273
    'https://wpapi.lwzmc1437.cn/Webp/133637578_p0.webp',                                // 7798x4386
    'https://wpapi.lwzmc1437.cn/Webp/17346892_p0.webp',                                 // 1100x799
    'https://wpapi.lwzmc1437.cn/Webp/38444556_p0.webp',                                 // 1500x900
    'https://wpapi.lwzmc1437.cn/Webp/39137791_p0.webp',                                 // 2929x2480
    'https://wpapi.lwzmc1437.cn/Webp/39874924_p0.webp',                                 // 1600x900
    'https://wpapi.lwzmc1437.cn/Webp/43674975_p0.webp',                                 // 1200x1023
    'https://wpapi.lwzmc1437.cn/Webp/48768083_p0.webp',                                 // 2274x1568
    'https://wpapi.lwzmc1437.cn/Webp/48824021_p0.webp',                                 // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/48824034_p0.webp',                                 // 1920x1080
    'https://wpapi.lwzmc1437.cn/Webp/61330061_p0.webp',                                 // 2455x1200
    'https://wpapi.lwzmc1437.cn/Webp/68157365_p0.webp',                                 // 2400x2000
    'https://wpapi.lwzmc1437.cn/Webp/89942064_p0.webp',                                 // 1300x848
    'https://wpapi.lwzmc1437.cn/Webp/90829116_p0.webp',                                 // 2006x1128
    'https://wpapi.lwzmc1437.cn/Webp/91555761_p0.webp',                                 // 1600x1100
    'https://wpapi.lwzmc1437.cn/Webp/91842494_p0.webp',                                 // 4093x2894
    'https://wpapi.lwzmc1437.cn/Webp/99526666_p0.webp',                                 // 3508x2480
    'https://wpapi.lwzmc1437.cn/Webp/19004863_p0.webp',                                 // 596x600 方形
    'https://wpapi.lwzmc1437.cn/Webp/48824041_p0.webp',                                 // 232x14 装饰条
  ];

  const urls = isMobile ? mobileUrls : desktopUrls;
  const index = Math.floor(Math.random() * urls.length);

  return Response.redirect(urls[index], 302);
};
