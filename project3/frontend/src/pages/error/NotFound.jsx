import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scaleIn } from '../../utils/animations';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div {...scaleIn} className="text-center">
                <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
                <p className="text-2xl text-gray-400 mb-8">Page not found</p>
                <Link to="/" className="btn-primary">
                    Go Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
