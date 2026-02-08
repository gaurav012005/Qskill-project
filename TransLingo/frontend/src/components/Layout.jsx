import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {children}
            </main>
        </div>
    );
}
