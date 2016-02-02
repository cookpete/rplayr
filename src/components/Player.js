import React, { Component, PropTypes } from 'react'
import ReactPlayer from 'react-player'

import classNames from './Player.scss'
import Range from './Range'
import Icon from './Icon'
import Duration from './Duration'
import { trackPlayerEvent } from '../analytics'

export default class Player extends Component {
  static propTypes = {
    activePost: PropTypes.object,
    onSkip: PropTypes.func
  };
  state = {
    playing: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0
  };
  componentWillReceiveProps (nextProps) {
    if (this.props.activePost !== nextProps.activePost) {
      this.setState({
        playing: true,
        played: 0,
        loaded: 0
      })
    }
  }
  onPlayerPlay = () => this.setState({ playing: true });
  onPlayerPause = () => this.setState({ playing: false }); // TODO: Fix YT firing onPause when ending
  onPlayerProgress = state => this.setState(this.state.seeking ? {} : state);
  onPlayerDuration = duration => this.setState({ duration });
  onPlayerEnded = () => {
    trackPlayerEvent('ended', this.props.activePost.url)
    this.props.onSkip()
  };
  onPlayerError = () => this.props.onSkip();
  onTogglePlaying = () => {
    this.setState({ playing: !this.state.playing })
    trackPlayerEvent(this.state.playing ? 'pause' : 'play')
  };
  onClickNext = () => {
    this.props.onSkip()
    trackPlayerEvent('next')
  };
  onClickPrev = () => {
    this.props.onSkip(-1)
    trackPlayerEvent('prev')
  };
  onSetVolume = volume => this.setState({ volume });
  onSeekStart = () => this.setState({ seeking: true });
  onSeekChange = fraction => this.setState({ played: fraction });
  onSeekEnd = fraction => {
    this.setState({ seeking: false })
    this.refs.player.seekTo(fraction)
  };
  render () {
    const { activePost } = this.props
    const { playing, volume, duration, played, loaded } = this.state
    return (
      <div>
        <section className={classNames.playerWrapper}>
          <ReactPlayer
            ref='player'
            className={classNames.player}
            width='100%'
            height='100%'
            url={activePost ? activePost.url : null}
            playing={playing}
            volume={volume}
            onPlay={this.onPlayerPlay}
            onPause={this.onPlayerPause}
            onProgress={this.onPlayerProgress}
            onDuration={this.onPlayerDuration}
            onEnded={this.onPlayerEnded}
            onError={this.onPlayerError}
            youtubeConfig={{ preload: true }}
          />
        </section>
        <section className={activePost ? classNames.controls : classNames.disabledControls}>
          <button onClick={this.onClickPrev}>
            <Icon icon='prev' />
          </button>
          <button onClick={this.onTogglePlaying}>
            <Icon icon={ playing ? 'pause' : 'play' } />
          </button>
          <button onClick={this.onClickNext}>
            <Icon icon='next' />
          </button>
          <Duration className={classNames.duration} seconds={duration * played} />
          <Range
            className={classNames.timeSlider}
            primary={played}
            secondary={loaded}
            onSeekStart={this.onSeekStart}
            onSeekChange={this.onSeekChange}
            onSeekEnd={this.onSeekEnd}
          />
          <Duration className={classNames.duration} seconds={duration} />
          <Icon icon='volume' className={classNames.volumeIcon} />
          <Range
            className={classNames.volumeSlider}
            primary={volume}
            onSeekChange={this.onSetVolume}
          />
        </section>
      </div>
    )
  }
}
