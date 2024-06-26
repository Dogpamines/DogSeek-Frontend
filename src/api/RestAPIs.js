export function GetAPI(address) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
        }).then(res => res.json())
    );
};

export function PostAPI(address, Object) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(Object),
        })
    );
};

export function PutAPI(address, Object) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify(Object),
        })
    );
};

export function DeleteAPI(address) {

    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${address}`;

    return (
        fetch(url, {
            method: 'Delete',
            headers: {
                'Access-Cross-Allow-Origin': '*',
                "Authorization": window.localStorage.getItem("accessToken")
            },
        })
    );
};

// Login
export const callLoginAPI = async ({ user }) => {

    const requestURL = 'http://localhost:8080/login';

    try {
        const response = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                userId: user.userId,
                userPass: user.userPass
            })
        });

        const jwtToken = response.headers.get("Authorization");
        // console.log(`JWT Token: ${jwtToken}`);

        if (response.status === 200 && jwtToken) {

            // 토큰 localStorage에 저장
            window.localStorage.setItem('accessToken', jwtToken);

            const result = 'true';
            return result;
        } else {
            const result = 'false';
            return result;
        }

    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};

export const checkAPI = async (check) => {
    const requestURL = 'http://localhost:8080/user/check';

    try {
        const response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Access-Control-Allow-Origin': '*', // CORS 설정
            },
            body: JSON.stringify(check),
        });

        console.log(`response : ${response}`);
        console.log(`headers : ${response.headers}`);

        if (response.status === 200) {
            const result = response.headers.get("Result");
            console.log(`q result : ${result}`);
            return result;
        } else {
            console.error(`HTTP 상태 코드: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error('에러 발생', error);
        return { status: 'error', message: error.message };
    }
};

// 회원가입
export const callRegisterAPI = async ({ user }) => {

    const requestURL = 'http://localhost:8080/signup';

    const requestBody = JSON.stringify({
        userId: user.userId,
        userPass: user.password,
        userNick: user.nick,
        userPhone: user.phone
    });

    const response = await fetch(requestURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*"
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = response.headers.get("Result");
        console.log(`q result : ${result}`);
        return result;
    } else {
        throw new Error("Failed to register");
    }

}

// 이메일 인증 코드 발송
export const callEmailVerification = async ( email ) => {

    const requestURL = 'http://localhost:8080/api/auth/send-verification-email';
    const requestBody = JSON.stringify({
        email: email,
    });

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = 'true';
        return result;
    } else {
        const result = 'false';
        return result;
    }
}

// 이메일 인증 확인
export const callEmailVerify = async ( email, authNum ) => {

    const requestURL = 'http://localhost:8080/api/auth/verify-email';
    const requestBody = JSON.stringify({
        email: email,
        token: authNum
    });

    const response = await fetch(requestURL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            'Access-Control-Allow-Origin': '*',
        },
        body: requestBody
    });

    if (response.status === 200) {
        const result = response.headers.get("Result");
            console.log(`q result : ${result}`);
            return result;
    } else {
        const result = 'false';
        return result;
    }
}