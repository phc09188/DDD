package com.fDiary.server.oauth.model.MemberStrategy;

public enum MemberStrategy {
    LTANHJI("저탄고지"),
    HDAN("고단백"),
    NORMAL("일반식"),
    DIET("다이어트식");

    private final String strategy;

    MemberStrategy(String strategy) {
        this.strategy = strategy;
    }

    public String getStrategy() {
        return strategy;
    }
}
