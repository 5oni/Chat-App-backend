import unittest
import requests
import logging
import random
import string
import json
# Configure logging
logging.basicConfig(level=logging.INFO)
name = 'Chat App : '
logger = logging.getLogger(name)

base_url = "http://localhost:8100"  # Replace with your API base URL
# Replace with your authentication token
userHeaders = None
adminHeaders = None
groupId = None


class TestAdminLogin(unittest.TestCase):
    def test_admin_login(self):
        # Retrieve the user ID from the previous test
        email = 'admin@riktamtech.com'
        password = '123456'
        endpoint = "/auth/v1/login"
        data = {
            "email": email,
            "password": password
        }
        response = requests.post(f"{base_url}{endpoint}", json=data)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.text)['data']
        global adminHeaders
        adminHeaders = {
            "x-access-token": res['token'],
            'x-access-user': res['user']['accountId']
        }


class TestAdminCreateUser(unittest.TestCase):
    def test_admin_create_user(self):
        endpoint = "/user/v1/add"
        data = {
            "userName": "user" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
            "password": "password",
            "name": 'Test Name',
            "email": f'test${"".join(random.choices(string.ascii_uppercase + string.digits, k=5))}@gmail.com'
            # "role": "USER"
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=adminHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)


class TestEditUser(unittest.TestCase):
    def test_edit_user(self):
        # Retrieve the user ID from the previous test
        userId = 'your_user_id'
        endpoint = f"/user/v1/edit?userId={userId}"
        data = {
            "userName": "new_user" + ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
            "password": "new_password",
            "name": 'Test Name',
            "email": f'test${"".join(random.choices(string.ascii_uppercase + string.digits, k=5))}@gmail.com',
            "userId": userId
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=adminHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)

        # Add code to edit the user
        # Modify user information


class TestLoginUser(unittest.TestCase):
    def test_login_user(self):
        # Retrieve the user ID from the previous test
        email = 'sunil@riktamtech.com'
        password = '123456'
        endpoint = "/auth/v1/login"
        data = {
            "email": email,
            "password": password
        }
        response = requests.post(f"{base_url}{endpoint}", json=data)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)
        res = json.loads(response.text)['data']

        global userHeaders
        userHeaders = {
            "x-access-token": res['token'],
            'x-access-user': res['user']['accountId']
        }


class TestCreateGroup(unittest.TestCase):
    def test_create_group(self):
        endpoint = "/group/v1/add"
        data = {
            "name": "New Group",
            # Replace with user IDs
            "members": ['652bc2de07180acf2d639da6', '652bc2de07180acf2d639da8'],
            "description": "Group Description"
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=userHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)
        global groupId
        groupId = json.loads(response.text)['data']['_id']


class TestAddMembersToGroup(unittest.TestCase):
    def test_add_members_to_group(self):
        endpoint = "/group/v1/add/members"
        data = {
            "groupId": groupId,
            "members": ['652bc2de07180acf2d639da6', '652bc2de07180acf2d639da8', '652aee91efc688b0693335eb'],
        }

        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=userHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)


class TestSendMessageInGroup(unittest.TestCase):
    def test_send_message_in_group(self):
        endpoint = "/groupChat/v1/add"
        data = {
            "message": "Test Message Hello",
            "groupId": groupId,
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=userHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)


class TestLikeMessage(unittest.TestCase):
    def test_like_message(self):
        endpoint = "/groupChat/v1/add/reaction"
        data = {
            "emoji": "😄",
            "chatId": "652a977f18a2e9c7daae0409",
            "groupId": groupId
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=userHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)


class TestDeleteGroup(unittest.TestCase):
    def test_delete_group(self):
        endpoint = "/group/v1/delete"
        data = {
            "groupId": groupId,
        }
        response = requests.post(
            f"{base_url}{endpoint}", json=data, headers=userHeaders)

        # Log request and response
        logger.info(f"Request to {endpoint} with data: {data}")
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Response content: {response.text}")
        print(f"\nTesting Endpoint :  {endpoint}\n")
        self.assertEqual(response.status_code, 200)


def suite():
    suite = unittest.TestSuite()
    suite.addTest(TestAdminLogin('test_admin_login'))
    suite.addTest(TestAdminCreateUser('test_admin_create_user'))
    suite.addTest(TestEditUser('test_edit_user'))
    suite.addTest(TestLoginUser('test_login_user'))
    suite.addTest(TestCreateGroup('test_create_group'))
    suite.addTest(TestAddMembersToGroup('test_add_members_to_group'))
    suite.addTest(TestSendMessageInGroup('test_send_message_in_group'))
    suite.addTest(TestLikeMessage('test_like_message'))
    suite.addTest(TestDeleteGroup('test_delete_group'))
    return suite


if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suite())
