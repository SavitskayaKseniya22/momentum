export class VolumeControl {
  audioElement: HTMLAudioElement;
  constructor(audio: HTMLAudioElement) {
    this.audioElement = audio;
  }
  addListener() {
    document.addEventListener('click', (event) => {
      if (event.target && event.target instanceof HTMLElement) {
        if (event.target.closest('.volume__control')) {
          this.toggleVolume(this.audioElement);
        }
      }
    });

    document
      .querySelector('.volume__range')
      ?.addEventListener('input', (event) => {
        this.audioElement.volume = Number(
          (event.target as HTMLInputElement).value
        );
        const volumeControl = document.querySelector(
          '.volume__control'
        ) as HTMLElement;
        if (this.audioElement.volume) {
          delete volumeControl.dataset.muted;
        } else {
          volumeControl.dataset.muted = 'true';
        }
      });
  }

  toggleVolume(audio: HTMLAudioElement) {
    const volumeRange = document.querySelector(
      '.volume__range'
    ) as HTMLInputElement;
    const volumeControl = document.querySelector(
      '.volume__control'
    ) as HTMLElement;
    const isMuted = audio.muted;
    if (audio.volume) {
      if (isMuted) {
        audio.muted = false;
        volumeRange.value = String(audio.volume);
        delete volumeControl.dataset.muted;
      } else {
        audio.muted = true;
        volumeRange.value = '0';
        volumeControl.dataset.muted = 'true';
      }
    } else {
      audio.volume = 0.5;
      volumeRange.value = '0.5';
      delete volumeControl.dataset.muted;
    }
  }
}
