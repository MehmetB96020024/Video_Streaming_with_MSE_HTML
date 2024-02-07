document.addEventListener('DOMContentLoaded', function() {
    if ('MediaSource' in window) {
        var video = document.getElementById('video');
        var mediaSource = new MediaSource();
        video.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', function() {
            var sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

            fetch('static/Test_2/playlist.m3u8')
                .then(response => response.text())
                .then(playlist => {
                    var segments = playlist.match(/output\d+\.mp4/g) || [];
                    var currentSegmentIndex = 0;

                    function loadNextSegment() {
                        if (currentSegmentIndex < segments.length && mediaSource.readyState === 'open' && !sourceBuffer.updating) {
                            fetch('static/Test_2/' + segments[currentSegmentIndex])
                                .then(response => response.arrayBuffer())
                                .then(data => {
                                    sourceBuffer.appendBuffer(data);
                                }).catch(error => console.error('Error fetching segment:', error));
                        }
                    }

                    sourceBuffer.addEventListener('updateend', () => {
                        currentSegmentIndex++;
                        loadNextSegment();
                    });

                    loadNextSegment();
                }).catch(error => console.error('Error fetching playlist:', error));
        });
    } else {
        console.error('MediaSource API is not supported in this browser.');
    }
});
