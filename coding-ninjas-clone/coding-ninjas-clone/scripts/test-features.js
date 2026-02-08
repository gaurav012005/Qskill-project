import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const timestamp = Date.now();
const testUser = {
    name: `Test User ${timestamp}`,
    email: `test_${timestamp}@example.com`,
    password: 'password123',
    phone: '9876543210'
};

const adminUser = {
    email: 'admin@codingninjas.com',
    password: 'admin123'
};

let userToken = '';
let adminToken = '';
let courseId = '';

const log = (step, success, details = '') => {
    const icon = success ? '✅' : '❌';
    console.log(`${icon} [${step}] ${success ? 'PASSED' : 'FAILED'}`);
    if (details) console.log(`   └─ ${details}`);
};

async function runTests() {
    console.log('🚀 Starting Coding Ninjas Feature Tests...\n');

    try {
        // 1. Health Check
        try {
            const res = await axios.get(`${API_URL}/health`);
            log('API Health Check', res.data.success, res.data.message);
        } catch (err) {
            log('API Health Check', false, err.message);
            return;
        }

        // 2. Auth: Register
        try {
            const res = await axios.post(`${API_URL}/auth/register`, testUser);
            log('User Registration', res.data.success, `Registered user: ${testUser.email}`);
        } catch (err) {
            log('User Registration', false, err.response?.data?.message || err.message);
        }

        // 3. Auth: Login
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email: testUser.email,
                password: testUser.password
            });
            userToken = res.data.data.token;
            log('User Login', res.data.success, 'Token received');
        } catch (err) {
            log('User Login', false, err.response?.data?.message || err.message);
        }

        // 4. Auth: Profile
        try {
            const res = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            log('View Profile', res.data.success, `Current user: ${res.data.data.name}`);
        } catch (err) {
            log('View Profile', false, err.response?.data?.message || err.message);
        }

        // 5. Courses: List
        try {
            const res = await axios.get(`${API_URL}/courses`);
            const courses = res.data.data.courses;
            log('Browse Courses', res.data.success, `Found ${courses.length} courses`);
            if (courses.length > 0) {
                courseId = courses[0].id;
            }
        } catch (err) {
            log('Browse Courses', false, err.response?.data?.message || err.message);
        }

        // 6. Courses: Search
        try {
            const res = await axios.get(`${API_URL}/courses?search=Full Stack`);
            const count = res.data.data.pagination.total;
            log('Search Courses', res.data.success, `Found ${count} courses matching "Full Stack"`);
        } catch (err) {
            log('Search Courses', false, err.response?.data?.message || err.message);
        }

        // 7. Lead Capture
        try {
            const res = await axios.post(`${API_URL}/leads`, {
                name: 'Lead Tester',
                email: `lead_${timestamp}@example.com`,
                phone: '1234567890',
                experience: 'Beginner',
                interest: 'Web Development' // controller uses interest, not topic
            });
            log('Lead Submission', res.data.success, 'Lead record created');
        } catch (err) {
            log('Lead Submission', false, err.response?.data?.message || err.message);
        }

        // 8. Enrollment (Mock Payment logic)
        try {
            if (courseId) {
                // Step 1: Create Payment Order
                const paymentRes = await axios.post(`${API_URL}/payments/create-order`, {
                    course_id: courseId // Correct key
                }, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });

                const transactionId = paymentRes.data.data.order_id; // Correct key

                // Step 2: Verify Mock Payment
                const verifyRes = await axios.post(`${API_URL}/payments/verify`, {
                    transaction_id: transactionId, // Correct key
                    payment_status: 'success' // Correct key
                }, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });

                log('Course Enrollment', verifyRes.data.success, 'Mock payment verified and enrolled');
            } else {
                log('Course Enrollment', false, 'No courses available to enroll');
            }
        } catch (err) {
            log('Course Enrollment', false, err.response?.data?.message || err.message);
        }

        // 9. Dashboard (My Courses)
        try {
            const res = await axios.get(`${API_URL}/enrollments/my-courses`, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            log('User Dashboard', res.data.success, `Found ${res.data.data.length} enrolled courses`);
        } catch (err) {
            log('User Dashboard', false, err.response?.data?.message || err.message);
        }

        // 10. Admin: Login
        try {
            const res = await axios.post(`${API_URL}/auth/login`, adminUser);
            adminToken = res.data.data.token;
            log('Admin Login', res.data.success, 'Admin token received');
        } catch (err) {
            log('Admin Login', false, err.response?.data?.message || err.message);
        }

        // 11. Admin: Stats
        try {
            const res = await axios.get(`${API_URL}/admin/stats`, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            const stats = res.data.data.stats;
            log('Admin Stats', res.data.success, `Total Revenue: ₹${stats.totalRevenue}`);
        } catch (err) {
            log('Admin Stats', false, err.response?.data?.message || err.message);
        }

        // 12. Admin: Leads
        try {
            const res = await axios.get(`${API_URL}/leads`, { // Correct endpoint
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            log('Admin Lead View', res.data.success, `Fetched ${res.data.data.length} leads`);
        } catch (err) {
            log('Admin Lead View', false, err.response?.data?.message || err.message);
        }

        console.log('\n✨ All tests completed!');

    } catch (globalErr) {
        console.error('\n🛑 A fatal error occurred during testing:');
        console.error(globalErr);
    }
}

runTests();
