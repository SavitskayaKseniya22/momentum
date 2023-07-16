import { PlaylistItem } from '../../interfaces';
import { DurationControl } from './DurationControl';
import { PlayOrder } from './PlayOrder';
import { VolumeControl } from './VolumeControl';
import './player.scss';

export class Player {
  playlist: PlaylistItem[];
  volumeControl: VolumeControl;
  durationControl: DurationControl;
  order: PlayOrder;
  audioElement: HTMLAudioElement;
  constructor(playlist: PlaylistItem[]) {
    this.playlist = playlist;
    this.audioElement = this.createAudioElement();
    this.setInitAudioAttributes(this.audioElement, this.playlist);
    this.order = new PlayOrder(playlist);
    this.volumeControl = new VolumeControl(this.audioElement);
    this.durationControl = new DurationControl(this.audioElement);
  }

  createAudioElement() {
    const element = document.createElement('audio');
    const context = new AudioContext();
    const track = context.createMediaElementSource(element);
    track.connect(context.destination);
    return element;
  }

  setInitAudioAttributes(audio: HTMLAudioElement, playlist: PlaylistItem[]) {
    audio.volume = 0.5;
    audio.src = playlist[0].src;
  }

  addListener() {
    document
      .querySelector('.player')
      ?.insertAdjacentElement('afterbegin', this.audioElement);

    this.volumeControl.addListener();
    this.durationControl.addListener();

    document.addEventListener('click', (event) => {
      if (event.target && event.target instanceof HTMLElement) {
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

    this.audioElement.addEventListener('play', () => {
      this.toggleMainPlayButtonView('play');
      this.toggleTrackControlView('play', this.order.value);
    });

    this.audioElement.addEventListener('pause', () => {
      this.toggleMainPlayButtonView('pause');
      this.toggleTrackControlView('pause', this.order.value);
    });

    this.audioElement.addEventListener('ended', () => {
      const prevOrderValue = this.order.value;
      this.order.update('increase');
      this.changeActiveTrack(
        this.audioElement,
        prevOrderValue,
        this.order.value
      );
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
      track && this.toggleButtonVisibility(type, track);
    }
  }

  updateActiveTrackView() {
    const track = document.querySelector(
      `.playlist-item[data-index="${this.order.value}"] input[name="playlist-item"]`
    );
    if (track) {
      (track as HTMLInputElement).checked = true;
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
    delete audio.dataset.playing;
  }

  updatePlayStatus(type: 'continue' | 'toggle', audio: HTMLAudioElement) {
    if (
      (type === 'continue' && audio.dataset.playing === 'true') ||
      (type === 'toggle' && audio.dataset.playing !== 'true')
    ) {
      this.playAudio(audio);
    } else {
      this.pauseAudio(audio);
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
