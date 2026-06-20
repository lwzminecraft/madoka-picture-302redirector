/**
 * Netlify Edge Function — 根据设备类型随机重定向图片。
 * 通过 User-Agent 判断手机端 / 电脑端，自动选择对应比例的图片：
 *   手机端 → 竖屏图片 (portrait, h > w)
 *   电脑端 → 横屏图片 (landscape, w > h)
 *   方形图片同时加入两端
 * 全部使用 AVIF 格式，共 138 张。
 */
export default async (request, context) => {
  const userAgent = request.headers.get("User-Agent") || "";

  const isMobile = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(userAgent);

  // 竖屏图片 — 适合手机端 (70 + 9 方形 = 79 张)
  const mobileUrls = [
    // --- 竖屏 ---
    'https://imagecdn.madoka1003.org/avif/0000000002.avif', // 2591x3624
    'https://imagecdn.madoka1003.org/avif/0000000003.avif', // 1614x2258
    'https://imagecdn.madoka1003.org/avif/0000000004.avif', // 2591x3624
    'https://imagecdn.madoka1003.org/avif/0000000005.avif', // 1785x3500
    'https://imagecdn.madoka1003.org/avif/0000000007.avif', // 1736x4900
    'https://imagecdn.madoka1003.org/avif/0000000010.avif', // 2160x3840
    'https://imagecdn.madoka1003.org/avif/0000000014.avif', // 1500x2000
    'https://imagecdn.madoka1003.org/avif/0000000015.avif', // 1060x1300
    'https://imagecdn.madoka1003.org/avif/0000000016.avif', // 1460x2132
    'https://imagecdn.madoka1003.org/avif/0000000019.avif', // 2480x3508
    'https://imagecdn.madoka1003.org/avif/0000000021.avif', // 491x600
    'https://imagecdn.madoka1003.org/avif/0000000027.avif', // 3720x7525
    'https://imagecdn.madoka1003.org/avif/0000000028.avif', // 833x1100
    'https://imagecdn.madoka1003.org/avif/0000000030.avif', // 1001x1359
    'https://imagecdn.madoka1003.org/avif/0000000031.avif', // 1520x2631
    'https://imagecdn.madoka1003.org/avif/0000000032.avif', // 793x1269
    'https://imagecdn.madoka1003.org/avif/0000000034.avif', // 3500x6067
    'https://imagecdn.madoka1003.org/avif/0000000035.avif', // 1784x2048
    'https://imagecdn.madoka1003.org/avif/0000000038.avif', // 706x977
    'https://imagecdn.madoka1003.org/avif/0000000039.avif', // 2480x3507
    'https://imagecdn.madoka1003.org/avif/0000000043.avif', // 2480x3508
    'https://imagecdn.madoka1003.org/avif/0000000044.avif', // 2480x3508
    'https://imagecdn.madoka1003.org/avif/0000000049.avif', // 2480x3508
    'https://imagecdn.madoka1003.org/avif/0000000050.avif', // 826x1169
    'https://imagecdn.madoka1003.org/avif/0000000051.avif', // 730x1032
    'https://imagecdn.madoka1003.org/avif/0000000052.avif', // 2480x3508
    'https://imagecdn.madoka1003.org/avif/0000000053.avif', // 1827x3000
    'https://imagecdn.madoka1003.org/avif/0000000054.avif', // 3035x4299
    'https://imagecdn.madoka1003.org/avif/0000000057.avif', // 1100x1467
    'https://imagecdn.madoka1003.org/avif/0000000059.avif', // 1423x2000
    'https://imagecdn.madoka1003.org/avif/0000000060.avif', // 3031x4706
    'https://imagecdn.madoka1003.org/avif/0000000063.avif', // 1000x1294
    'https://imagecdn.madoka1003.org/avif/0000000065.avif', // 1000x1294
    'https://imagecdn.madoka1003.org/avif/0000000067.avif', // 1600x2000
    'https://imagecdn.madoka1003.org/avif/0000000069.avif', // 1600x2000
    'https://imagecdn.madoka1003.org/avif/0000000070.avif', // 2823x4000
    'https://imagecdn.madoka1003.org/avif/0000000071.avif', // 2814x4000
    'https://imagecdn.madoka1003.org/avif/0000000074.avif', // 2830x4000
    'https://imagecdn.madoka1003.org/avif/0000000075.avif', // 1920x3210
    'https://imagecdn.madoka1003.org/avif/0000000077.avif', // 1240x1754
    'https://imagecdn.madoka1003.org/avif/0000000078.avif', // 1400x2306
    'https://imagecdn.madoka1003.org/avif/0000000079.avif', // 633x1214
    'https://imagecdn.madoka1003.org/avif/0000000081.avif', // 1232x1735
    'https://imagecdn.madoka1003.org/avif/0000000083.avif', // 2412x3776
    'https://imagecdn.madoka1003.org/avif/0000000085.avif', // 2100x2700
    'https://imagecdn.madoka1003.org/avif/0000000087.avif', // 2834x4091
    'https://imagecdn.madoka1003.org/avif/0000000088.avif', // 2705x4091
    'https://imagecdn.madoka1003.org/avif/0000000089.avif', // 1300x1838
    'https://imagecdn.madoka1003.org/avif/0000000096.avif', // 1000x2500
    'https://imagecdn.madoka1003.org/avif/0000000097.avif', // 1000x1333
    'https://imagecdn.madoka1003.org/avif/0000000099.avif', // 2876x4098
    'https://imagecdn.madoka1003.org/avif/0000000100.avif', // 2871x4081
    'https://imagecdn.madoka1003.org/avif/0000000101.avif', // 2873x4094
    'https://imagecdn.madoka1003.org/avif/0000000102.avif', // 2874x4089
    'https://imagecdn.madoka1003.org/avif/0000000103.avif', // 1095x1546
    'https://imagecdn.madoka1003.org/avif/0000000104.avif', // 1415x2000
    'https://imagecdn.madoka1003.org/avif/0000000105.avif', // 1224x2017
    'https://imagecdn.madoka1003.org/avif/0000000106.avif', // 1412x2000
    'https://imagecdn.madoka1003.org/avif/0000000107.avif', // 656x960
    'https://imagecdn.madoka1003.org/avif/0000000108.avif', // 1200x1371
    'https://imagecdn.madoka1003.org/avif/0000000110.avif', // 1200x1750
    'https://imagecdn.madoka1003.org/avif/0000000111.avif', // 2894x4093
    'https://imagecdn.madoka1003.org/avif/0000000113.avif', // 777x1100
    'https://imagecdn.madoka1003.org/avif/0000000114.avif', // 1070x1500
    'https://imagecdn.madoka1003.org/avif/0000000121.avif', // 860x1200
    'https://imagecdn.madoka1003.org/avif/0000000124.avif', // 1016x1500
    'https://imagecdn.madoka1003.org/avif/0000000125.avif', // 1062x1500
    'https://imagecdn.madoka1003.org/avif/0000000130.avif', // 911x1280
    'https://imagecdn.madoka1003.org/avif/0000000134.avif', // 1351x1909
    'https://imagecdn.madoka1003.org/avif/0000000135.avif', // 1200x1800
    // --- 方形 (通用) ---
    'https://imagecdn.madoka1003.org/avif/0000000008.avif', // 2908x2946
    'https://imagecdn.madoka1003.org/avif/0000000018.avif', // 1585x1585
    'https://imagecdn.madoka1003.org/avif/0000000020.avif', // 596x600
    'https://imagecdn.madoka1003.org/avif/0000000033.avif', // 2406x2654
    'https://imagecdn.madoka1003.org/avif/0000000056.avif', // 2362x2257
    'https://imagecdn.madoka1003.org/avif/0000000090.avif', // 1314x1400
    'https://imagecdn.madoka1003.org/avif/0000000093.avif', // 1210x1300
    'https://imagecdn.madoka1003.org/avif/0000000094.avif', // 571x571
    'https://imagecdn.madoka1003.org/avif/0000000118.avif', // 1665x1800
  ];

  // 横屏图片 — 适合电脑端 (59 + 9 方形 = 68 张)
  const desktopUrls = [
    // --- 横屏 ---
    'https://imagecdn.madoka1003.org/avif/0000000001.avif', // 1125x800
    'https://imagecdn.madoka1003.org/avif/0000000006.avif', // 3846x2099
    'https://imagecdn.madoka1003.org/avif/0000000009.avif', // 7798x4386
    'https://imagecdn.madoka1003.org/avif/0000000011.avif', // 8000x4000
    'https://imagecdn.madoka1003.org/avif/0000000012.avif', // 1325x1028
    'https://imagecdn.madoka1003.org/avif/0000000013.avif', // 5172x2909
    'https://imagecdn.madoka1003.org/avif/0000000017.avif', // 1100x799
    'https://imagecdn.madoka1003.org/avif/0000000022.avif', // 2048x1152
    'https://imagecdn.madoka1003.org/avif/0000000023.avif', // 2224x1668
    'https://imagecdn.madoka1003.org/avif/0000000024.avif', // 1000x759
    'https://imagecdn.madoka1003.org/avif/0000000025.avif', // 3979x3387
    'https://imagecdn.madoka1003.org/avif/0000000026.avif', // 1166x666
    'https://imagecdn.madoka1003.org/avif/0000000029.avif', // 1638x1279
    'https://imagecdn.madoka1003.org/avif/0000000036.avif', // 1621x1378
    'https://imagecdn.madoka1003.org/avif/0000000037.avif', // 806x563
    'https://imagecdn.madoka1003.org/avif/0000000040.avif', // 3104x1376
    'https://imagecdn.madoka1003.org/avif/0000000041.avif', // 7680x4320
    'https://imagecdn.madoka1003.org/avif/0000000042.avif', // 2108x1200
    'https://imagecdn.madoka1003.org/avif/0000000045.avif', // 1500x900
    'https://imagecdn.madoka1003.org/avif/0000000046.avif', // 1600x900
    'https://imagecdn.madoka1003.org/avif/0000000047.avif', // 2929x2480
    'https://imagecdn.madoka1003.org/avif/0000000048.avif', // 1600x900
    'https://imagecdn.madoka1003.org/avif/0000000055.avif', // 1200x1023
    'https://imagecdn.madoka1003.org/avif/0000000058.avif', // 2039x1378
    'https://imagecdn.madoka1003.org/avif/0000000061.avif', // 2274x1568
    'https://imagecdn.madoka1003.org/avif/0000000062.avif', // 1920x1080
    'https://imagecdn.madoka1003.org/avif/0000000064.avif', // 1920x1080
    'https://imagecdn.madoka1003.org/avif/0000000066.avif', // 3844x2894
    'https://imagecdn.madoka1003.org/avif/0000000068.avif', // 3717x2882
    'https://imagecdn.madoka1003.org/avif/0000000072.avif', // 933x761
    'https://imagecdn.madoka1003.org/avif/0000000073.avif', // 700x493
    'https://imagecdn.madoka1003.org/avif/0000000076.avif', // 1536x451 横幅
    'https://imagecdn.madoka1003.org/avif/0000000080.avif', // 1280x720
    'https://imagecdn.madoka1003.org/avif/0000000082.avif', // 2455x1200
    'https://imagecdn.madoka1003.org/avif/0000000084.avif', // 5262x3174
    'https://imagecdn.madoka1003.org/avif/0000000086.avif', // 2851x837 横幅
    'https://imagecdn.madoka1003.org/avif/0000000091.avif', // 2400x2000
    'https://imagecdn.madoka1003.org/avif/0000000092.avif', // 1190x784
    'https://imagecdn.madoka1003.org/avif/0000000095.avif', // 1150x793
    'https://imagecdn.madoka1003.org/avif/0000000098.avif', // 840x525
    'https://imagecdn.madoka1003.org/avif/0000000109.avif', // 2048x1536
    'https://imagecdn.madoka1003.org/avif/0000000112.avif', // 1920x1080
    'https://imagecdn.madoka1003.org/avif/0000000115.avif', // 1807x531 横幅
    'https://imagecdn.madoka1003.org/avif/0000000116.avif', // 1568x1104
    'https://imagecdn.madoka1003.org/avif/0000000117.avif', // 1300x848
    'https://imagecdn.madoka1003.org/avif/0000000119.avif', // 2636x2286
    'https://imagecdn.madoka1003.org/avif/0000000120.avif', // 2006x1128
    'https://imagecdn.madoka1003.org/avif/0000000122.avif', // 1600x1100
    'https://imagecdn.madoka1003.org/avif/0000000123.avif', // 4093x2894
    'https://imagecdn.madoka1003.org/avif/0000000126.avif', // 950x570
    'https://imagecdn.madoka1003.org/avif/0000000127.avif', // 950x672
    'https://imagecdn.madoka1003.org/avif/0000000128.avif', // 950x594
    'https://imagecdn.madoka1003.org/avif/0000000129.avif', // 2560x1440
    'https://imagecdn.madoka1003.org/avif/0000000131.avif', // 1278x798
    'https://imagecdn.madoka1003.org/avif/0000000132.avif', // 950x672
    'https://imagecdn.madoka1003.org/avif/0000000133.avif', // 3508x2480
    'https://imagecdn.madoka1003.org/avif/0000000136.avif', // 1800x1273
    'https://imagecdn.madoka1003.org/avif/0000000137.avif', // 1920x1080
    'https://imagecdn.madoka1003.org/avif/0000000138.avif', // 1920x1080
    // --- 方形 (通用) ---
    'https://imagecdn.madoka1003.org/avif/0000000008.avif', // 2908x2946
    'https://imagecdn.madoka1003.org/avif/0000000018.avif', // 1585x1585
    'https://imagecdn.madoka1003.org/avif/0000000020.avif', // 596x600
    'https://imagecdn.madoka1003.org/avif/0000000033.avif', // 2406x2654
    'https://imagecdn.madoka1003.org/avif/0000000056.avif', // 2362x2257
    'https://imagecdn.madoka1003.org/avif/0000000090.avif', // 1314x1400
    'https://imagecdn.madoka1003.org/avif/0000000093.avif', // 1210x1300
    'https://imagecdn.madoka1003.org/avif/0000000094.avif', // 571x571
    'https://imagecdn.madoka1003.org/avif/0000000118.avif', // 1665x1800
  ];

  const urls = isMobile ? mobileUrls : desktopUrls;
  const index = Math.floor(Math.random() * urls.length);

  return Response.redirect(urls[index], 302);
};
