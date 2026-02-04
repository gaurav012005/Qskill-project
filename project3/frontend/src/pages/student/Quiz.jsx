import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';
import api from '../../utils/api';

const Quiz = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetchQuiz();
    }, [courseId]);

    const fetchQuiz = async () => {
        try {
            const response = await api.get(`/quizzes/course/${courseId}`);
            setQuiz(response.data.quiz);
            if (response.data.has_taken) {
                setResult(response.data.result);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Quiz not available for this course');
            navigate(`/courses/${courseId}/learn`);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (questionId, answerIndex) => {
        setAnswers({ ...answers, [questionId]: answerIndex });
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < quiz.questions.length) {
            alert('Please answer all questions');
            return;
        }

        setSubmitting(true);
        try {
            const response = await api.post(`/quizzes/${quiz.id}/submit`, { answers });
            setResult(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit quiz');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (result) {
        return (
            <motion.div {...pageTransition} className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-2xl w-full glass-card p-8 rounded-2xl text-center">
                    <div className={`text-6xl mb-4 ${result.passed ? '' : ''}`}>
                        {result.passed ? '🎉' : '📚'}
                    </div>
                    <h1 className="text-4xl font-heading font-bold mb-4">
                        {result.passed ? 'Congratulations!' : 'Keep Learning!'}
                    </h1>
                    <p className="text-xl text-gray-300 mb-6">
                        You scored {result.score} out of {result.total_points} ({result.percentage}%)
                    </p>
                    <p className="text-gray-400 mb-8">
                        {result.passed
                            ? `You passed! (Required: ${result.passing_score}%)`
                            : `You need ${result.passing_score}% to pass. Review the lessons and try again.`
                        }
                    </p>
                    <button
                        onClick={() => navigate('/my-courses')}
                        className="btn-primary"
                    >
                        Back to My Courses
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div {...pageTransition} className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-heading font-bold mb-2">{quiz.title}</h1>
                    <p className="text-gray-400">Passing score: {quiz.passing_score}%</p>
                </div>

                <div className="space-y-6">
                    {quiz.questions.map((question, index) => (
                        <div key={question.id} className="glass-card p-6 rounded-xl">
                            <h3 className="font-semibold mb-4">
                                {index + 1}. {question.question}
                            </h3>
                            <div className="space-y-3">
                                {JSON.parse(question.options).map((option, optionIndex) => (
                                    <label
                                        key={optionIndex}
                                        className={`block p-4 rounded-lg cursor-pointer transition ${answers[question.id] === optionIndex
                                                ? 'bg-primary/20 border-2 border-primary'
                                                : 'glass-card hover:bg-white/10'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            checked={answers[question.id] === optionIndex}
                                            onChange={() => handleAnswer(question.id, optionIndex)}
                                            className="sr-only"
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="btn-primary px-12 py-4 text-lg disabled:opacity-50"
                    >
                        {submitting ? 'Submitting...' : 'Submit Quiz'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Quiz;
