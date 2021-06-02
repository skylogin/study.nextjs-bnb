import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        try{
            // 파라미터 체크
            const { email, firstname, lastname, password, birthday } = req.body;
            if(!email || !firstname || !lastname || !password || !birthday) {
                res.statusCode = 400;
                return res.send("필수 데이터가 없습니다.");
            }
    
            // 기가입 체크
            const userExist = Data.user.exist({ email });
            if(userExist){
                res.statusCode = 409;
                res.send("이미 가입된 이메일입니다.");
            }
    
            // 비밀번호 암호화
            const hashedPassword = bcrypt.hashSync(password, 8);
    
            // 데이터 저장
            const users = Data.user.getList();
            let userId;
            if(users.length === 0){
                userId = 1;
            } else{
                userId = users[users.length -1].id + 1;
            }
    
            const newUser: StoredUserType = {
                id: userId,
                email, 
                firstname, 
                lastname,
                password: hashedPassword,
                birthday,
                profileImage: "/static/image/user/default_user_profile_image.jpg"
            };
            Data.user.write([...users, newUser]);
    
            // JWT 생성
            const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
            
            const expire = new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString;
            // 헤더 설정 (JWT 3일)
            res.setHeader(
                "Set-Cookie", 
                `access-token=${token}; path=/; expires=${expire}; httponly`
            );
    
            // 패스워드 제외 유저정보
            const newUserWithoutPassword: Partial<Pick<StoredUserType, "password">> = newUser;
            delete newUserWithoutPassword.password;
            
    
            res.statusCode = 200;
            return res.send(newUser);
        } catch(e){
            console.log(e);
        } finally{
            res.statusCode = 500;
            res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}