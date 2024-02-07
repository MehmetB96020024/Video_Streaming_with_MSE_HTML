# Video_Streaming_with
I'm tryingvideo streaming in Django project with video segment (chunks) that creating by ffmpeg

The code of FFMPEG that i created video segment (chunks) in "/static/Test_2/"  is "ffmpeg -i Test_2.mp4 -t 120 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -map 0 -f segment -segment_time 10 -segment_format_options movflags=frag_keyframe+empty_moov -segment_list Test_2/playlist.m3u8 -segment_list_type m3u8 Test_2/output%03d.mp4".

I did not send output%03d.mp4 files to this repository.

The problem in this is i am getting this error in the web page: "Video can't be played because the file is corrupt".

Why am i getting this error? How to fix it? Do I need to patch fixes in FFMPEG code? Please help...
