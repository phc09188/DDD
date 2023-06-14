package com.fDiary.server.oauth.controller;

import com.fDiary.server.security.SecurityUtil;
import com.fDiary.server.token.model.TokenDTO;
import com.fDiary.server.token.model.TokenResponseDTO;
import com.fDiary.server.oauth.model.LoginRequestDTO;
import com.fDiary.server.oauth.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Tag(name = "사용자 관련", description = "사용자 관련 API")
@RestController
@Log4j2
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/selectType")
    public ResponseEntity<?> selectStrategy(@RequestParam String type){
        String userId = SecurityUtil.getCurrentUsername();
        memberService.selectUserType(userId, type);
        Map<String,String> result = new HashMap<>();
        return ResponseEntity.ok(result.put("result", "success"));
    }
}
