export class VolumeControl {
  audioElement: HTMLAudioElement | null | undefined;
  constructor() {}
  addListener() {
    this.audioElement = document.querySelector('audio');
    document.addEventListener('click', (event) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        this.audioElement
      ) {
        if (event.target.closest('.volume__control')) {
          this.toggleVolume(this.audioElement);
        }
      }
    });

    document
      .querySelector('.volume__range')
      ?.addEventListener('input', (event) => {
        if (this.audioElement) {
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
