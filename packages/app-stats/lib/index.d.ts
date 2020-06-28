export interface StatsUIElements {
    caloriesText?: TextElement | null;
    caloriesImage?: ImageElement | null;
    activityText?: TextElement | null;
    activityImage?: ImageElement | null;
    heartRateText?: TextElement | null;
    heartRateImage?: ImageElement | null;
    statsVisibilityToggles?: GraphicsElement[] | null;
    statsToToggle?: GraphicsElement[] | null;
    showCaloriesAsActivity: boolean;
}
export declare function initializeStats(uiElements: StatsUIElements): () => void;
//# sourceMappingURL=index.d.ts.map