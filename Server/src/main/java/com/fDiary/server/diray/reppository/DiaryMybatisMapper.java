package com.fDiary.server.diray.reppository;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.oauth.model.Member;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiaryMybatisMapper {
    List<Diary> selectListNearLocation(Double lnt, Double lat);

    List<Diary> selectThisWeekDiaries(String memberId, String startDate, String today);
}
