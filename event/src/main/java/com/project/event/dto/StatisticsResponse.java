package com.project.event.dto;

import lombok.Data;

import java.util.List;

@Data
public class StatisticsResponse {

    private long totalEvents;
    private long upcomingEvents;
    private long pastEvents;
    private List<Integer> monthlyEventTrends;
}
