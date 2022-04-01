interface VideoOptions {
  controls?: boolean
  autoplay?: boolean
  mute?: boolean
  poster?: string
  controlBar?: object,
  sources: VideoSourceType
}

type VideoSourceType = {
  src: string
  type: string
}

export function userVideo (options: VideoOptions) {

}
