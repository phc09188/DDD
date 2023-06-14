package com.fDiary.server.diray.service;

import com.fDiary.server.diray.model.dto.DiaryDTO;
import com.fDiary.server.diray.model.dto.DiaryReadDTO;
import com.fDiary.server.diray.model.dto.DiaryWriteDTO;
import com.fDiary.server.diray.model.dto.FoodDto;
import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.entity.DiaryImage;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.model.type.DiaryGrade;
import com.fDiary.server.diray.model.type.MealTime;
import com.fDiary.server.diray.reppository.*;
import com.fDiary.server.oauth.model.ImageDTO;
import com.fDiary.server.oauth.model.Member;
import com.fDiary.server.oauth.model.MemberStrategy.MemberStrategy;
import com.fDiary.server.oauth.repository.MemberRepository;
import com.fDiary.server.util.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.fDiary.server.oauth.model.MemberStrategy.MemberStrategy.DIET;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final FoodRepository foodRepository;
    private final DiaryImageRepository diaryImageRepository;
    private final MemberRepository memberRepository;
    private final DiaryMapper diaryMapper;
    private final FileService fileService;
    private final DiaryMybatisMapper diaryMybatisMapper;

    @Value("${spring.servlet.multipart.location}")
    private String uploadPath;

    public Long writeDiary(String userId, DiaryWriteDTO diaryWriteDTO) {
        Member member = memberRepository.findByUserId(userId).get();
        Diary diary = diaryMapper.diaryWriteDTOToDiary(diaryWriteDTO);
        MemberStrategy strategy = member.getStrategy();

        switch (diaryWriteDTO.getMealTime()) {
            case ("아침") -> diary.setMealTime(MealTime.Breakfast);
            case ("점심") -> diary.setMealTime(MealTime.Lunch);
            case ("저녁") -> diary.setMealTime(MealTime.Dinner);
            case ("간식") -> diary.setMealTime(MealTime.Snack);
        }
        diary.setDiaryGrade(calcDiaryGrade(strategy));
        diaryRepository.save(diary);
        List<Food> foodList = new ArrayList<>();
        for (FoodDto dto : diaryWriteDTO.getFoods()) {
            foodList.add(Food.dtoToFood(dto, diary));
        }
        foodRepository.saveAll(foodList);
        diary.setFoods(foodList);
        diary.setMember(member);
        diaryRepository.save(diary);
        return diary.getDiaryId();
    }

    private DiaryGrade calcDiaryGrade(MemberStrategy strategy) {
        if(strategy == MemberStrategy.DIET){

        }else if(strategy == MemberStrategy.HDAN){

        }else if(strategy == MemberStrategy.LTANHJI){

        }else if(strategy == MemberStrategy.NORMAL){

        }
        return null;
    }

    private Map<String, String> resultMessage() {
        Map<String, String> map = new HashMap<>();
        map.put("result", "success");
        return map;
    }

    protected DiaryImage saveDiaryImage(MultipartFile file, Diary diary) {
        String originalName = file.getOriginalFilename();
        Path root = Paths.get(uploadPath +"/diaryImage");
        try {
            assert originalName != null;
            ImageDTO imageDTO = fileService.createImageDTO(originalName, root);
            DiaryImage diaryImage = DiaryImage.builder()
                    .uuid(imageDTO.getUuid())
                    .fileName(imageDTO.getFileName())
                    .fileUrl(imageDTO.getFileUrl())
                    .diary(diary)
                    .build();
            file.transferTo(Paths.get(imageDTO.getFileUrl()));
            return diaryImageRepository.save(diaryImage);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    public DiaryReadDTO readDateDiary(String date, String userId) throws FileNotFoundException {
        Member member = memberRepository.findByUserId(userId).get();
        List<Diary> diaries = diaryRepository.findAllByWriteDateAndMember(date, member);
        boolean[] mealTimes = new boolean[4];
        for (Diary diary : diaries) {
            MealTime mealTime = diary.getMealTime();
            switch (mealTime.name()) {
                case "Breakfast" -> mealTimes[0] = true;
                case "Launch" -> mealTimes[1] = true;
                case "Dinner" -> mealTimes[2] = true;
                case "Snack" -> mealTimes[3] = true;
            }
        }
        return DiaryReadDTO.builder()
                .diaries(DiaryDTO.toDiary(diaries))
                .diaryExist(mealTimes)
                .build();
    }

    public void fileUpload( Long diaryId, MultipartFile input) {
        Diary diary = diaryRepository.findById(diaryId).get();
        System.out.println(input.isEmpty());
        DiaryImage diaryImage = saveDiaryImage(input, diary);
        diary.setDiaryImage(diaryImage);
        diaryRepository.save(diary);
    }

    public void deleteDiary(String diaryId) {
        diaryRepository.findById(Long.valueOf(diaryId));
    }

    public void getWeeklyReport(String userId) {
        Member member = memberRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("토큰 정보와 일치하는 사용자가 없습니다."));
        LocalDateTime cur = LocalDateTime.now();
        LocalDateTime startDateTime = cur.minusDays(cur.getDayOfWeek().getValue()-1);
        String today = cur.toString().split("T")[0];
        String startDate = startDateTime.toString().split("T")[0];
        List<Diary> diaries =  diaryMybatisMapper.selectThisWeekDiaries(member.getId(), startDate,today);
        // diary 타입에 따른 계산식 만들어야함. 상태정보를 가져와야하기 때문

    }
}
