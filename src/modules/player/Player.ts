import { PlaylistItem } from "../../interfaces";
import DurationControl from "./DurationControl";
import PlayOrder from "./PlayOrder";
import VolumeControl from "./VolumeControl";
import "./player.scss";

class Player {
  playlist: PlaylistItem[];

  volumeControl: VolumeControl;

  durationControl: DurationControl;

  order: PlayOrder;

  audioElement: HTMLAudioElement;

  constructor(playlist: PlaylistItem[]) {
    this.playlist = playlist;
    this.audioElement = Player.createAudioElement(this.playlist);
    this.order = new PlayOrder(playlist);
    this.volumeControl = new VolumeControl(this.audioElement);
    this.durationControl = new DurationControl(this.audioElement);
  }

  static createAudioElement(playlist: PlaylistItem[]) {
    const element = Object.assign(document.createElement("audio"), {
      src: playlist[0].src,
      volume: 0.5,
    });
    const context = new AudioContext();
    const track = context.createMediaElementSource(element);
    track.connect(context.destination);
    return element;
  }

  addListener() {
    document
      .querySelector(".player")
      ?.insertAdjacentElement("afterbegin", this.audioElement);

    this.volumeControl.addListener();
    this.durationControl.addListener();

    document.addEventListener("click", (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest(".play-toggle-main")) {
          Player.updatePlayStatus("toggle", this.audioElement);
        } else if (event.target.closest(".playlist-item")) {
          if (event.target.closest("label")) {
            return;
          }
          const parent = event.target.closest(".playlist-item") as HTMLElement;
          if (parent) {
            const index = Number(parent.dataset.index);
            if (
              this.order.value !== index ||
              (this.order.value === index && this.audioElement.paused)
            ) {
              const prevOrderValue = this.order.value;
              this.order.update("replace", index);
              this.changeActiveTrackBySelection(
                this.audioElement,
                prevOrderValue,
                this.order.value
              );
            } else {
              Player.pauseAudio(this.audioElement);
            }
          }
        } else if (event.target.closest(".play-next")) {
          const prevOrderValue = this.order.value;
          this.order.update("increase");
          this.changeActiveTrack(
            this.audioElement,
            prevOrderValue,
            this.order.value
          );
        } else if (event.target.closest(".play-prev")) {
          const prevOrderValue = this.order.value;
          this.order.update("decrease");
          this.changeActiveTrack(
            this.audioElement,
            prevOrderValue,
            this.order.value
          );
        }
      }
    });

    this.audioElement.addEventListener("play", () => {
      Player.toggleMainPlayButtonView("play");
      Player.toggleTrackControlView("play", this.order.value);
    });

    this.audioElement.addEventListener("pause", () => {
      Player.toggleMainPlayButtonView("pause");
      Player.toggleTrackControlView("pause", this.order.value);
    });

    this.audioElement.addEventListener("ended", () => {
      const prevOrderValue = this.order.value;
      this.order.update("increase");
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
    Player.toggleTrackControlView("pause", prevOrder);

    audio.setAttribute("src", this.playlist[nextOrder].src);
    Player.updatePlayStatus("continue", audio);
    this.updateActiveTrackView();
  }

  changeActiveTrackBySelection(
    audio: HTMLAudioElement,
    prevOrder: number,
    nextOrder: number
  ) {
    Player.toggleTrackControlView("pause", prevOrder);
    audio.setAttribute("src", this.playlist[nextOrder].src);
    Player.playAudio(audio);
  }

  static toggleMainPlayButtonView(type: "play" | "pause") {
    const mainButton = document.querySelector(".play-toggle-main");
    if (mainButton) {
      Player.toggleButtonVisibility(type, mainButton);
    }
  }

  static toggleTrackControlView(type: "play" | "pause", order: number) {
    const track = document.querySelector(
      `.playlist-item[data-index="${order}"] .play-toggle`
    );
    if (track) {
      Player.toggleButtonVisibility(type, track);
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

  static toggleButtonVisibility(type: "play" | "pause", container: Element) {
    const playIcon = container.querySelector(".bx-play-circle");
    const pauseIcon = container.querySelector(".bx-pause-circle");
    if (type === "play") {
      playIcon?.classList.add("hidden");
      pauseIcon?.classList.remove("hidden");
    } else {
      playIcon?.classList.remove("hidden");
      pauseIcon?.classList.add("hidden");
    }
  }

  static playAudio(audio: HTMLAudioElement) {
    audio.play();
    audio.setAttribute("data-playing", "true");
  }

  static pauseAudio(audio: HTMLAudioElement) {
    audio.pause();
    audio.removeAttribute("data-playing");
  }

  static updatePlayStatus(
    type: "continue" | "toggle",
    audio: HTMLAudioElement
  ) {
    if (
      (type === "continue" && audio.dataset.playing === "true") ||
      (type === "toggle" && audio.dataset.playing !== "true")
    ) {
      Player.playAudio(audio);
    } else {
      Player.pauseAudio(audio);
    }
  }

  static makePlaylistItem(item: PlaylistItem, index: number) {
    return `<li class="playlist-item" data-index="${index}">
      <input 
        type="radio"
        name="playlist-item"
        id="${item.title + index}" ${index === 0 ? "checked" : ""}
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

  static makePlaylist(playlist: PlaylistItem[]) {
    return playlist
      .map((item, index) => {
        return Player.makePlaylistItem(item, index);
      })
      .join("");
  }

  content() {
    return `<div class="player"  data-id="player-toggle">
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
      ${Player.makePlaylist(this.playlist)}
      </ul>
    </div>`;
  }
}

export default Player;
