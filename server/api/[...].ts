import * as UserApplication from "../applications/userApplication";

const router = createRouter();

router.get('/users', defineEventHandler(UserApplication.findAll));
router.get('/users/:id', defineEventHandler(UserApplication.findById));
router.post('/users', defineEventHandler(UserApplication.createUser));
router.put('/users/:id', defineEventHandler(UserApplication.updateUser));
router.delete('/users/:id', defineEventHandler(UserApplication.deleteUser));

router.post('/auth/signin', defineEventHandler(UserApplication.signIn));
router.post('/auth/signout', defineEventHandler(UserApplication.signOut));
router.post('/auth/signup', defineEventHandler(UserApplication.signUp));
router.get('/auth/getSession', defineEventHandler(UserApplication.getSession));

export default useBase('/api/v1', router.handler);
