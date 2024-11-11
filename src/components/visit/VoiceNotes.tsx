import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { TNSRecorder, TNSPlayer, AudioRecorderOptions } from '@nativescript/audio';
import { knownFolders, path } from '@nativescript/core';

type VoiceNote = {
    id: string;
    text: string;
    timestamp: Date;
};

export function VoiceNotes() {
    const [isRecording, setIsRecording] = React.useState(false);
    const [notes, setNotes] = React.useState<VoiceNote[]>([]);
    const [processing, setProcessing] = React.useState(false);
    
    const recorder = React.useRef(new TNSRecorder());
    const recordingPath = React.useRef(path.join(knownFolders.documents().path, "recording.m4a"));

    const startRecording = async () => {
        try {
            const options: AudioRecorderOptions = {
                filename: recordingPath.current,
                format: 3, // ACC/M4A
                metering: true,
                infoCallback: (info) => console.log(`Record info: ${info}`),
                errorCallback: (error) => console.error(`Record error: ${error}`)
            };

            await recorder.current.start(options);
            setIsRecording(true);
        } catch (err) {
            console.error("Failed to start recording:", err);
        }
    };

    const stopRecording = async () => {
        try {
            await recorder.current.stop();
            setIsRecording(false);
            setProcessing(true);
            
            // TODO: Replace mock transcription with actual speech-to-text API integration
            // Requirements:
            // - HIPAA-compliant speech-to-text service
            // - Support for medical terminology
            // - Real-time transcription capabilities
            // - Error handling for failed transcriptions
            // - Secure storage of audio files
            setTimeout(() => {
                const newNote: VoiceNote = {
                    id: Date.now().toString(),
                    text: "Patient shows improvement in mobility. Completed all prescribed exercises. Blood pressure normal at 120/80.",
                    timestamp: new Date()
                };
                
                setNotes(prev => [...prev, newNote]);
                setProcessing(false);
            }, 1500);
        } catch (err) {
            console.error("Failed to stop recording:", err);
            setProcessing(false);
        }
    };

    return (
        <stackLayout className="w-full bg-white p-4 rounded-lg mb-4">
            <label className="font-bold mb-2">Voice Notes</label>
            
            <button
                className={`p-4 rounded-lg mb-4 ${
                    isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'bg-blue-500 text-white'
                }`}
                onTap={isRecording ? stopRecording : startRecording}
                isEnabled={!processing}
            >
                {processing ? 'Processing...' : (isRecording ? 'Stop Recording' : 'Start Recording')}
            </button>

            <scrollView height="200">
                <stackLayout>
                    {notes.map(note => (
                        <stackLayout 
                            key={note.id} 
                            className="p-3 mb-2 border-l-4 border-blue-500 bg-gray-50"
                        >
                            <label className="text-sm text-gray-500">
                                {note.timestamp.toLocaleTimeString()}
                            </label>
                            <label className="text-sm" textWrap={true}>
                                {note.text}
                            </label>
                        </stackLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </stackLayout>
    );
}