class VolumeControl {
  audioElement: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.audioElement = audio;
  }

  addListener() {
    document.addEventListener("click", (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest(".volume__control")) {
          VolumeControl.toggleVolume(this.audioElement);
        }
      }
    });

    document
      .querySelector(".volume__range")
      ?.addEventListener("input", (event) => {
        this.audioElement.volume = Number(
          (event.target as HTMLInputElement).value
        );
        const volumeControl = document.querySelector(
          ".volume__control"
        ) as HTMLElement;
        if (this.audioElement.volume) {
          delete volumeControl.dataset.muted;
        } else {
          volumeControl.dataset.muted = "true";
        }
      });
  }

  static toggleVolume(audio: HTMLAudioElement) {
    const volumeRange = document.querySelector(
      ".volume__range"
    ) as HTMLInputElement;
    const volumeControl = document.querySelector(
      ".volume__control"
    ) as HTMLElement;
    const isMuted = audio.muted;
    if (audio.volume) {
      if (isMuted) {
        Object.assign(audio, {
          muted: false,
        });
        volumeRange.value = String(audio.volume);
        delete volumeControl.dataset.muted;
      } else {
        Object.assign(audio, {
          muted: true,
        });

        volumeRange.value = "0";
        volumeControl.dataset.muted = "true";
      }
    } else {
      Object.assign(audio, {
        volume: 0.5,
      });
      volumeRange.value = "0.5";
      delete volumeControl.dataset.muted;
    }
  }
}

export default VolumeControl;
