export function a11yProps(index: number) {
    return {
        id: `to-do-tab-${index}`,
        'aria-controls': `to-do-tabpanel-${index}`,
    };
}