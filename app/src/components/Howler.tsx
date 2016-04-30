import { Component, ReactElement } from "react";
import { Howl } from "howler";

interface HowlerProps {
  src: String;
  playing: boolean;
};

export class Howler extends Component<HowlerProps, {}> {

  private howl: Howl;

  public componentDidMount(): void {
    this.howl = new (Howl as any)({
      autoplay: this.props.playing,
      src: this.props.src,
    });
  }

  public componentWillUpdate(nextProps: HowlerProps, nextState: void): void {
    if(nextProps.src !== this.props.src) {
      this.componentWillUnmount();
      this.componentDidMount();
    }

    if(nextProps.playing && !this.props.playing) {
      this.howl.play();
    } else if(!nextProps.playing && this.props.playing) {
      this.howl.pause();
    }
  }

  public componentWillUnmount (): void {
    this.howl.unload();
  }

  public render(): ReactElement<void> {
    return null;
  }
}
