import {Component, ReactElement} from "react";
import {Howl} from "howler";

interface HowlerProps {
  src: String;
  playing: boolean;
};

export class Howler extends Component<HowlerProps, {}> {

  private howl: Howl;

  public componentDidMount(): void {
    this.initHowler();
  }

  public initHowler(props: HowlerProps = this.props): void {
    this.howl = new (Howl as any)({
      autoplay: props.playing,
      src: props.src,
    });
  }

  public componentWillUpdate(nextProps: HowlerProps, nextState: void): void {
    if(nextProps.src !== this.props.src) {
      this.howl.unload();
      this.initHowler(nextProps);
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
