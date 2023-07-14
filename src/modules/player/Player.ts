import { PlaylistItem } from '../../interfaces';
import './player.scss';

export class Player {
  audioContext: AudioContext;
  track: MediaElementAudioSourceNode | undefined;
  audioElement: HTMLAudioElement | null | undefined;
  order: number;
  maxOrder: number;
  minOrder: number;
  playlist: PlaylistItem[];
  constructor(playlist: PlaylistItem[]) {
    this.audioContext = new AudioContext();
    this.playlist = playlist;
    this.order = 0;
    this.maxOrder = this.playlist.length - 1;
    this.minOrder = 0;
  }

  makeAudioContext() {
    this.audioElement = document.querySelector('audio');
    if (this.audioElement) {
      this.track = this.audioContext.createMediaElementSource(
        this.audioElement
      );
      this.track.connect(this.audioContext.destination);
    }
  }

  addListener() {
    this.makeAudioContext();
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
              this.order !== index ||
              (this.order === index && this.audioElement.paused)
            ) {
              const prevOrderValue = this.order;
              this.updateOrder('replace', index);
              this.changeActiveTrackBySelection(
                this.audioElement,
                prevOrderValue,
                this.order
              );
            } else {
              this.pauseAudio(this.audioElement);
            }
          }
        } else if (event.target.closest('.play-next')) {
          const prevOrderValue = this.order;
          this.updateOrder('increase');
          this.changeActiveTrack(this.audioElement, prevOrderValue, this.order);
        } else if (event.target.closest('.play-prev')) {
          const prevOrderValue = this.order;
          this.updateOrder('decrease');
          this.changeActiveTrack(this.audioElement, prevOrderValue, this.order);
        }
      }
    });

    this.audioElement?.addEventListener('play', () => {
      this.toggleMainPlayButtonView('play');
      this.toggleTrackControlView('play', this.order);
    });

    this.audioElement?.addEventListener('pause', () => {
      this.toggleMainPlayButtonView('pause');
      this.toggleTrackControlView('pause', this.order);
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
      `.playlist-item[data-index="${this.order}"] input[name="playlist-item"]`
    ) as HTMLInputElement;
    if (track) {
      track.checked = true;
    }
  }

  calculateNewOrder(
    type: 'increase' | 'decrease',
    currentValue: number,
    maxValue: number,
    minValue: number
  ) {
    switch (type) {
      case 'increase':
        const nextValue = currentValue + 1;
        return nextValue <= maxValue ? nextValue : minValue;
      case 'decrease':
        const prevValue = currentValue - 1;
        return prevValue >= minValue ? prevValue : maxValue;
      default:
        return currentValue;
    }
  }

  updateOrder(
    type: 'increase' | 'decrease' | 'replace',
    orderForReplace?: number
  ) {
    if (type === 'replace' && orderForReplace !== undefined) {
      this.order = orderForReplace;
    } else {
      this.order = this.calculateNewOrder(
        type as 'increase' | 'decrease',
        this.order,
        this.maxOrder,
        this.minOrder
      );
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
        this.playlist[this.order].src
      }" controls data-playing="false"></audio>
      <div class="customPlayer">
        <div class="durationBlock">
          <input
            type="range"
            class="durationAudio"
            value="0"
            min="0"
            max="100"
            step="1"
          />
          <span>
            <span class="playProgress">00:00</span>
            /
            <span class="playProgressTotal">00:00</span>
          </span>
        </div>

        <div class="volumeBlock">
          <button class="changeVolumeAudio">
            <i class='bx bx-volume-full' ></i>
          </button>
          <input type="range" class="volumeAudio" min="0" max="1" step="0.1" />
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
