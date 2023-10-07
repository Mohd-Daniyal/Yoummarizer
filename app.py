from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
import openai

app = Flask(__name__)

@app.get('/summary')
def summary_api():
    video_id = request.args.get('id', '')
    transcript = get_transcript(video_id)
    summary = get_summary(transcript)
    return summary, 200

def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])
    return transcript

def get_summary(transcript):
    summary = ''
    openai.api_key = '#YOUR_API_KEY'
    model_engine = 'text-davinci-003'

    prompt = f'Summarize this youtube transcript : {transcript}'
    completion = openai.Completion.create(engine=model_engine, prompt=prompt, max_tokens=1024, n=1, stop=None, temperature=0.5)
    summary = completion.choices[0].text
    return summary
    

if __name__ == '__main__':
    app.run()