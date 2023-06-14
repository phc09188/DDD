package com.fDiary.server.diray.reppository;

import com.fDiary.server.diray.model.entity.Diary;
import com.fDiary.server.diray.model.dto.DiaryWriteDTO;
import com.fDiary.server.diray.model.entity.Food;
import com.fDiary.server.diray.model.dto.FoodDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DiaryMapper {
    @Mapping(target = "foodId", ignore = true)
    @Mapping(target = "diary", ignore = true)
    Food foodDtoToFood(FoodDto foodDto);

    @Mapping(target = "diaryImage", ignore = true)
    @Mapping(target = "foods", ignore = true)
    @Mapping(target = "diaryId", ignore = true)
    @Mapping(target = "member", ignore = true)
    @Mapping(target = "mealTime", ignore = true)
    Diary diaryWriteDTOToDiary(DiaryWriteDTO diaryWriteDTO);
}
