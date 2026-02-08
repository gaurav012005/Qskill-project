import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';
import { pageTransition } from '../../utils/animations';

const EditCourse = () => {
    return (
        <>
            <Navbar />
            <motion.div {...pageTransition} className="min-h-screen pt-24 px-4 pb-12">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-gradient mb-8">
                        Edit Course
                    </h1>
                    <div className="glass-card p-8 rounded-2xl">
                        <p className="text-gray-400">Course editing form coming soon...</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default EditCourse;
