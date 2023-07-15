export class DurationControl {
  audioElement: HTMLAudioElement | null | undefined;
  constructor() {}
  addListener() {
    this.audioElement = document.querySelector('audio');
    this.audioElement?.addEventListener('loadedmetadata', () => {
      const durationTotal = document.querySelector('.duration__total');
      if (this.audioElement && durationTotal) {
        durationTotal.textContent = this.convertDuration(
          this.audioElement.duration
        );
      }
      const durationRange = document.querySelector(
        '.duration__range'
      ) as HTMLInputElement;
      if (durationRange && this.audioElement) {
        durationRange.max = String(Math.floor(this.audioElement.duration));
      }
    });

    this.audioElement?.addEventListener('timeupdate', () => {
      const durationProgress = document.querySelector('.duration__progress');
      if (this.audioElement && durationProgress) {
        durationProgress.textContent = this.convertDuration(
          this.audioElement.currentTime
        );
      }
      const durationRange = document.querySelector(
        '.duration__range'
      ) as HTMLInputElement;
      if (durationRange && this.audioElement) {
        durationRange.value = String(Math.floor(this.audioElement.currentTime));
      }
    });

    document
      .querySelector('.duration__range')
      ?.addEventListener('input', (event) => {
        if (this.audioElement)
          this.audioElement.currentTime = Number(
            (event.target as HTMLInputElement).value
          );
      });
  }

  convertDuration(value: number) {
    const min = Math.floor(Math.floor(value) / 60);
    const additionMin = min < 10 ? '0' : '';
    const sec = Math.floor(Math.floor(value) % 60);
    const additionSec = sec < 10 ? '0' : '';
    return `${additionMin + min}:${additionSec + sec}`;
  }
}
