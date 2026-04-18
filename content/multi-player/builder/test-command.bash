#!/bin/bash

# ffmpeg -y \
#     -i v2.webm \
#     -i v2.webm \
#     -filter_complex "xstack=inputs=2:layout=0_0|1_0" \
#     test.webm


# ffmpeg -y \
#     -i v2.webm \
#     -i v2.webm \
#     -filter_complex "[0]scale=200:100[v0]; [1]scale=100:200[v1]; \
#     [v0][v1]xstack=inputs=2:layout=0_0|1_0" \
#     test.webm


# ffmpeg -y -i v2.webm -i v2.webm -i v2.webm -i v2.webm -i v2.webm \
#   -f lavfi -i color=c=black:s=1920x1080:d=10 \
#   -filter_complex "[5]setpts=PTS-STARTPTS[bg]; \
#                    [1]trim=start=2:end=7,setpts=PTS-STARTPTS,scale=400:300[v1]; \
#                    [2]trim=start=1:end=8,setpts=PTS-STARTPTS,scale=400:300[v2]; \
#                    [3]trim=start=3:end=9,setpts=PTS-STARTPTS,scale=400:300[v3]; \
#                    [4]trim=start=0:end=6,setpts=PTS-STARTPTS,scale=400:300[v4]; \
#                    [bg][v1]overlay=20:20:enable='between(t,0,7)'[tmp1]; \
#                    [tmp1][v2]overlay=440:20:enable='between(t,1,8)'[tmp2]; \
#                    [tmp2][v3]overlay=20:340:enable='between(t,2,9)'[tmp3]; \
#                    [tmp3][v4]overlay=440:340:enable='between(t,3,10)'[out]" \
#   -map "[out]" -t 10 output.webm
#


# ffmpeg -y -i v2.webm \
#   -f lavfi -i color=c=black:s=3360x2400:d=10 \
#   -filter_complex "[0]trim=start=0:end=10,setpts=PTS-STARTPTS,scale=400:300[v]; \
#                    [v]split=35[v0][v1][v2][v3][v4][v5][v6][v7][v8][v9][v10][v11][v12][v13][v14][v15][v16][v17][v18][v19][v20][v21][v22][v23][v24][v25][v26][v27][v28][v29][v30][v31][v32][v33][v34]; \
#                    [1][v0]overlay=20:20:enable='between(t,0,10)'[tmp0]; \
#                    [tmp0][v1]overlay=440:20:enable='between(t,0,10)'[tmp1]; \
#                    [tmp1][v2]overlay=860:20:enable='between(t,0,10)'[tmp2]; \
#                    [tmp2][v3]overlay=1280:20:enable='between(t,0,10)'[tmp3]; \
#                    [tmp3][v4]overlay=1700:20:enable='between(t,0,10)'[tmp4]; \
#                    [tmp4][v5]overlay=2120:20:enable='between(t,0,10)'[tmp5]; \
#                    [tmp5][v6]overlay=2540:20:enable='between(t,0,10)'[tmp6]; \
#                    [tmp6][v7]overlay=20:340:enable='between(t,0,10)'[tmp7]; \
#                    [tmp7][v8]overlay=440:340:enable='between(t,0,10)'[tmp8]; \
#                    [tmp8][v9]overlay=860:340:enable='between(t,0,10)'[tmp9]; \
#                    [tmp9][v10]overlay=1280:340:enable='between(t,0,10)'[tmp10]; \
#                    [tmp10][v11]overlay=1700:340:enable='between(t,0,10)'[tmp11]; \
#                    [tmp11][v12]overlay=2120:340:enable='between(t,0,10)'[tmp12]; \
#                    [tmp12][v13]overlay=2540:340:enable='between(t,0,10)'[tmp13]; \
#                    [tmp13][v14]overlay=20:660:enable='between(t,0,10)'[tmp14]; \
#                    [tmp14][v15]overlay=440:660:enable='between(t,0,10)'[tmp15]; \
#                    [tmp15][v16]overlay=860:660:enable='between(t,0,10)'[tmp16]; \
#                    [tmp16][v17]overlay=1280:660:enable='between(t,0,10)'[tmp17]; \
#                    [tmp17][v18]overlay=1700:660:enable='between(t,0,10)'[tmp18]; \
#                    [tmp18][v19]overlay=2120:660:enable='between(t,0,10)'[tmp19]; \
#                    [tmp19][v20]overlay=2540:660:enable='between(t,0,10)'[tmp20]; \
#                    [tmp20][v21]overlay=20:980:enable='between(t,0,10)'[tmp21]; \
#                    [tmp21][v22]overlay=440:980:enable='between(t,0,10)'[tmp22]; \
#                    [tmp22][v23]overlay=860:980:enable='between(t,0,10)'[tmp23]; \
#                    [tmp23][v24]overlay=1280:980:enable='between(t,0,10)'[tmp24]; \
#                    [tmp24][v25]overlay=1700:980:enable='between(t,0,10)'[tmp25]; \
#                    [tmp25][v26]overlay=2120:980:enable='between(t,0,10)'[tmp26]; \
#                    [tmp26][v27]overlay=2540:980:enable='between(t,0,10)'[tmp27]; \
#                    [tmp27][v28]overlay=20:1300:enable='between(t,0,10)'[tmp28]; \
#                    [tmp28][v29]overlay=440:1300:enable='between(t,0,10)'[tmp29]; \
#                    [tmp29][v30]overlay=860:1300:enable='between(t,0,10)'[tmp30]; \
#                    [tmp30][v31]overlay=1280:1300:enable='between(t,0,10)'[tmp31]; \
#                    [tmp31][v32]overlay=1700:1300:enable='between(t,0,10)'[tmp32]; \
#                    [tmp32][v33]overlay=2120:1300:enable='between(t,0,10)'[tmp33]; \
#                    [tmp33][v34]overlay=2540:1300:enable='between(t,0,10)'[out]" \
#   -map "[out]" -map 0:a:0 -c:a libopus -t 10 output.webm

ffmpeg -y -i v2.webm \
  -f lavfi -i color=c=black:s=3360x2400:d=10 \
  -filter_complex "[0]trim=start=0:end=10,setpts=PTS-STARTPTS,scale=400:300[v]; \
                   [v]split=35[v0][v1][v2][v3][v4][v5][v6][v7][v8][v9][v10][v11][v12][v13][v14][v15][v16][v17][v18][v19][v20][v21][v22][v23][v24][v25][v26][v27][v28][v29][v30][v31][v32][v33][v34]; \
                   [1][v0]overlay=20:20:enable='between(t,0,10)'[tmp0]; \
                   [tmp0][v1]overlay=440:20:enable='between(t,0.5,10)'[tmp1]; \
                   [tmp1][v2]overlay=860:20:enable='between(t,1,10)'[tmp2]; \
                   [tmp2][v3]overlay=1280:20:enable='between(t,1.5,10)'[tmp3]; \
                   [tmp3][v4]overlay=1700:20:enable='between(t,2,10)'[tmp4]; \
                   [tmp4][v5]overlay=2120:20:enable='between(t,2.5,10)'[tmp5]; \
                   [tmp5][v6]overlay=2540:20:enable='between(t,3,10)'[tmp6]; \
                   [tmp6][v7]overlay=20:340:enable='between(t,3.5,10)'[tmp7]; \
                   [tmp7][v8]overlay=440:340:enable='between(t,4,10)'[tmp8]; \
                   [tmp8][v9]overlay=860:340:enable='between(t,4.5,10)'[tmp9]; \
                   [tmp9][v10]overlay=1280:340:enable='between(t,5,10)'[tmp10]; \
                   [tmp10][v11]overlay=1700:340:enable='between(t,5.5,10)'[tmp11]; \
                   [tmp11][v12]overlay=2120:340:enable='between(t,6,10)'[tmp12]; \
                   [tmp12][v13]overlay=2540:340:enable='between(t,6.5,10)'[tmp13]; \
                   [tmp13][v14]overlay=20:660:enable='between(t,7,10)'[tmp14]; \
                   [tmp14][v15]overlay=440:660:enable='between(t,7.5,10)'[tmp15]; \
                   [tmp15][v16]overlay=860:660:enable='between(t,8,10)'[tmp16]; \
                   [tmp16][v17]overlay=1280:660:enable='between(t,8.5,10)'[tmp17]; \
                   [tmp17][v18]overlay=1700:660:enable='between(t,9,10)'[tmp18]; \
                   [tmp18][v19]overlay=2120:660:enable='between(t,9.5,10)'[tmp19]; \
                   [tmp19][v20]overlay=2540:660:enable='between(t,10,10)'[tmp20]; \
                   [tmp20][v21]overlay=20:980:enable='between(t,0.5,10)'[tmp21]; \
                   [tmp21][v22]overlay=440:980:enable='between(t,1,10)'[tmp22]; \
                   [tmp22][v23]overlay=860:980:enable='between(t,1.5,10)'[tmp23]; \
                   [tmp23][v24]overlay=1280:980:enable='between(t,2,10)'[tmp24]; \
                   [tmp24][v25]overlay=1700:980:enable='between(t,2.5,10)'[tmp25]; \
                   [tmp25][v26]overlay=2120:980:enable='between(t,3,10)'[tmp26]; \
                   [tmp26][v27]overlay=2540:980:enable='between(t,3.5,10)'[tmp27]; \
                   [tmp27][v28]overlay=20:1300:enable='between(t,4,10)'[tmp28]; \
                   [tmp28][v29]overlay=440:1300:enable='between(t,4.5,10)'[tmp29]; \
                   [tmp29][v30]overlay=860:1300:enable='between(t,5,10)'[tmp30]; \
                   [tmp30][v31]overlay=1280:1300:enable='between(t,5.5,10)'[tmp31]; \
                   [tmp31][v32]overlay=1700:1300:enable='between(t,6,10)'[tmp32]; \
                   [tmp32][v33]overlay=2120:1300:enable='between(t,6.5,10)'[tmp33]; \
                   [tmp33][v34]overlay=2540:1300:enable='between(t,7,10)'[out]" \
  -map "[out]" -map 0:a:0 -c:a libopus -t 10 output.webm
