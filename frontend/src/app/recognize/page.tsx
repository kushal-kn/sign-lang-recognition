import type { Metadata } from "next";
import RecognitionScreen from "@/components/Recognition";

export const metadata: Metadata = {
    title: "Real-time Sign Language Recognition - SilentSign",
    description: "Use our AI-powered real-time sign language recognition to translate hand gestures into text and speech instantly.",
    openGraph: {
        type: "article",
        title: "Real-time Sign Language Recognition - SilentSign",
        description: "Translate hand gestures into text and speech instantly with our AI-powered recognition.",
    },
};

export default function RecognitionPage() {
    return (
        <div className="min-h-screen selection:bg-brand-blue selection:text-neutral-900">
            <RecognitionScreen />
        </div>
    );
}