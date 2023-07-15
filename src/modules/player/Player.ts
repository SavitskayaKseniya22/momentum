import { PlaylistItem } from '../../interfaces';
import { DurationControl } from './DurationControl';
import { PlayOrder } from './PlayOrder';
import { VolumeControl } from './VolumeControl';
import './player.scss';

export class Player {
  audioContext: AudioContext;
  track: MediaElementAudioSourceNode | undefined;
  audioElement: HTMLAudioElement | null | undefined;
  playlist: PlaylistItem[];
  volumeControl: VolumeControl;
  durationControl: DurationControl;
  order: PlayOrder;
  constructor(playlist: PlaylistItem[]) {
    this.audioContext = new AudioContext();
    this.playlist = playlist;
    this.order = new PlayOrder(playlist);
    this.volumeControl = new VolumeControl();
    this.durationControl = new DurationControl();
  }

  makeAudioContext() {
    this.audioElement = document.querySelector('audio');
    if (this.audioElement) {
      this.track = this.audioContext.createMediaElementSource(
        this.audioElement
      );
      this.track.connect(this.audioContext.destination);
      this.audioElement.volume = 0.5;
    }
  }

  addListener() {
    this.makeAudioContext();
    this.volumeControl.addListener();
    this.durationControl.addListener();
    document.addEventListener('click', (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        this.audioElement
      ) {
        if (event.target.closest('.play-toggle-main')) {
          this.updatePlayStatus('toggle', this.audioElement);
        } else if (event.target.closest('.playlist-item')) {
          if (event.target.closest('label')) {
            return;
          }
          const parent = event.target.closest('.playlist-item') as HTMLElement;
          if (parent) {
            const index = Number(parent.dataset.index);
            if (
              this.order.value !== index ||
              (this.order.value === index && this.audioElement.paused)
            ) {
              const prevOrderValue = this.order.value;
              this.order.update('replace', index);
              this.changeActiveTrackBySelection(
                this.audioElement,
                prevOrderValue,
                this.order.value
              );
            } else {
              this.pauseAudio(this.audioElement);
            }
          }
        } else if (event.target.closest('.play-next')) {
          const prevOrderValue = this.order.value;
          this.order.update('increase');
          this.changeActiveTrack(
            this.audioElement,
            prevOrderValue,
            this.order.value
          );
        } else if (event.target.closest('.play-prev')) {
          const prevOrderValue = this.order.value;
          this.order.update('decrease');
          this.changeActiveTrack(
            this.audioElement,
            prevOrderValue,
            this.order.value
          );
        }
      }
    });

    this.audioElement?.addEventListener('play', () => {
      this.toggleMainPlayButtonView('play');
      this.toggleTrackControlView('play', this.order.value);
    });

    this.audioElement?.addEventListener('pause', () => {
      this.toggleMainPlayButtonView('pause');
      this.toggleTrackControlView('pause', this.order.value);
    });

    this.audioElement?.addEventListener('ended', () => {
      if (this.audioElement) {
        const prevOrderValue = this.order.value;
        this.order.update('increase');
        this.changeActiveTrack(
          this.audioElement,
          prevOrderValue,
          this.order.value
        );
      }
    });
  }

  changeActiveTrack(
    audio: HTMLAudioElement,
    prevOrder: number,
    nextOrder: number
  ) {
    this.toggleTrackControlView('pause', prevOrder);
    audio.src = this.playlist[nextOrder].src;
    this.updatePlayStatus('continue', audio);
    this.updateActiveTrackView();
  }

  changeActiveTrackBySelection(
    audio: HTMLAudioElement,
    prevOrder: number,
    nextOrder: number
  ) {
    this.toggleTrackControlView('pause', prevOrder);
    audio.src = this.playlist[nextOrder].src;
    this.playAudio(audio);
  }

  toggleMainPlayButtonView(type: 'play' | 'pause') {
    const mainButton = document.querySelector('.play-toggle-main');
    if (mainButton) {
      this.toggleButtonVisibility(type, mainButton);
    }
  }

  toggleTrackControlView(type: 'play' | 'pause', order: number) {
    const track = document.querySelector(
      `.playlist-item[data-index="${order}"] .play-toggle`
    );
    if (track) {
      this.toggleButtonVisibility(type, track);
    }
  }

  updateActiveTrackView() {
    const track = document.querySelector(
      `.playlist-item[data-index="${this.order.value}"] input[name="playlist-item"]`
    ) as HTMLInputElement;
    if (track) {
      track.checked = true;
    }
  }

  toggleButtonVisibility(type: 'play' | 'pause', container: Element) {
    const playIcon = container.querySelector('.bx-play-circle');
    const pauseIcon = container.querySelector('.bx-pause-circle');
    if (type === 'play') {
      playIcon?.classList.add('hidden');
      pauseIcon?.classList.remove('hidden');
    } else {
      playIcon?.classList.remove('hidden');
      pauseIcon?.classList.add('hidden');
    }
  }

  playAudio(audio: HTMLAudioElement) {
    audio.play();
    audio.dataset.playing = 'true';
  }

  pauseAudio(audio: HTMLAudioElement) {
    audio.pause();
    audio.dataset.playing = 'false';
  }

  updatePlayStatus(type: 'continue' | 'toggle', audio: HTMLAudioElement) {
    if (type === 'continue') {
      if (audio.dataset.playing === 'true') {
        this.playAudio(audio);
      } else if (audio.dataset.playing === 'false') {
        this.pauseAudio(audio);
      }
    } else {
      if (audio.dataset.playing === 'false') {
        this.playAudio(audio);
      } else if (audio.dataset.playing === 'true') {
        this.pauseAudio(audio);
      }
    }
  }

  makePlaylistItem(item: PlaylistItem, index: number) {
    return `<li class="playlist-item" data-index="${index}">
      <input 
        type="radio"
        name="playlist-item"
        id="${item.title + index}" ${index === 0 ? 'checked' : ''}
      />
      <label for="${
        item.title + index
      }" class="playlist-item__play-index play-toggle">
        <i class="bx bx-play-circle"></i>
        <i class="bx bx-pause-circle hidden"></i>
      </label>
      <label class="playlist-item__title" for="${item.title + index}">${
      item.title
    }</label>
    </li>`;
  }

  makePlaylist(playlist: PlaylistItem[]) {
    return playlist
      .map((item, index) => {
        return this.makePlaylistItem(item, index);
      })
      .join('');
  }

  content() {
    return `<div class="player">
      <audio src="${
        this.playlist[this.order.value].src
      }" controls data-playing="false"></audio>
      <div class="custom-player">
        <div class="duration">
          <input
            type="range"
            class="duration__range"
            value="0"
            min="0"
            max="100"
            step="1"
          />
          <span>
            <span class="duration__progress">00:00</span>
            /
            <span class="duration__total">00:00</span>
          </span>
        </div>

        <div class="volume">
  <button class="volume__control">
    <i class="bx bx-volume-full"></i>
  </button>
  <input type="range" class="volume__range" min="0" max="1" step="0.1" />
</div>

        <div class="player-controls">
          <button class="play-prev player-icon">
          <i class='bx bx-skip-previous-circle' ></i>
          </button>
          <button class="play-toggle-main play-toggle player-icon">
          <i class='bx bx-play-circle'></i>
          <i class='bx bx-pause-circle hidden'></i>
          </button>
          <button class="play-next player-icon">
          <i class='bx bx-skip-next-circle' ></i>
          </button>
        </div>
      </div>

      <ul class="playlist">
      ${this.makePlaylist(this.playlist)}
      </ul>
    </div>`;
  }
}
