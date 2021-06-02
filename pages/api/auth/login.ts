import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Data from "../../../lib/data";
import { StoredUserType } from "../../../types/user";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){
        try{
            // 파라미터 체크
            const { email, password } = req.body;
            if(!email || !password) {
                res.statusCode = 400;
                return res.send("필수 데이터가 없습니다.");
            }
    
            // 유저 검색
            const user = Data.user.find({ email });
            if(!user){
                res.statusCode = 404;
                return res.send("해당 이메일의 유저가 없습니다.");
            }
    
            // 비밀번호 확인
            const isPasswordMatched = bcrypt.compareSync(password, user.password);
            if(!isPasswordMatched){
                res.statusCode = 403;
                return res.send("비밀번호가 일치하지 않습니다.");
            }
    
            // 토큰전달
            const token = jwt.sign(String(user.id), process.env.JWT_SECRET!);
            
            const expire = new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString;
            // 헤더 설정 (JWT 3일)
            res.setHeader(
                "Set-Cookie", 
                `access-token=${token}; path=/; expires=${expire}; httponly`
            );
    
            // 비밀번호 제외
            const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;
            delete userWithoutPassword.password;
    
            res.statusCode = 200;
            return res.send(user);
        } catch(e){
            console.log(e);
        } finally{
            res.statusCode = 500;
            return res.end();
        }
    }
    res.statusCode = 405;
    return res.end();
}