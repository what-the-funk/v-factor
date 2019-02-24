import React, { PureComponent } from 'react';

interface Props {}

class LocalVideo extends PureComponent<Props> {
  public videoRef: React.RefObject<HTMLVideoElement> = React.createRef();

  public async componentDidMount() {
    await this.requestLocalVideo();
  }

  public async requestLocalVideo() {
    const constraints: MediaStreamConstraints = {
      audio: true,
      video: true,
    };

    try {
      const mediaStream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.onReceiveLocalVideo(mediaStream);
    } catch (error) {
      console.log('error', error);
    }
  }

  public onReceiveLocalVideo(stream: MediaStream) {
    const videoElement: HTMLVideoElement = this.videoRef.current as HTMLVideoElement;
    videoElement.srcObject = stream;
  }

  public render(): React.ReactNode {
    return <video autoPlay={true} muted={true} ref={this.videoRef} />;
  }
}

export default LocalVideo;
