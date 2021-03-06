import { ArrowLeft } from "phosphor-react"
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../services/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";


interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export const FeedbackContentStep = ({ feedbackType, onFeedbackSent, onFeedbackRestartRequested }: FeedbackContentStepProps) => {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comments, setcomments] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const handleSubmitFeedback = (e: FormEvent) => {
    e.preventDefault()
    setIsSendingFeedback(true)

    api.post('/feedbacks', {
      type: feedbackType,
      comments,
      screenshot,
    })

    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" onClick={onFeedbackRestartRequested} />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2" >
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          <span>{feedbackTypeInfo.title}</span>
        </span>
        <CloseButton />
      </header>
      {/* <div className="flex py-8 gap-2 w-full"></div> */}
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que est?? acontecendo..."
          onChange={event => setcomments(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />
          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={comments.length === 0 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}