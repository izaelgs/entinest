import * as UserApplication from "../applications/userApplication";

const router = createRouter();

router.get('/', defineEventHandler(UserApplication.helloWorld));
router.get('/users', defineEventHandler(UserApplication.findAll));

export default useBase('/api/v1', router.handler);