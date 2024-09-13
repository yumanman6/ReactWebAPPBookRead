import React from "react";

import ChapterFooterNavBar from '@/pages/chapter/components/footer/components/navBar';
import ChapterFooterCatalog from '@/pages/chapter/components/footer/components/catalog';
import ChapterFooterProgress from '@/pages/chapter/components/footer/components/progressBar';
import ChapterFooterSettingBar from '@/pages/chapter/components/footer/components/settingBar';

const ChapterFooter: React.FC = React.memo(() => {
    return (
        <>
            <ChapterFooterNavBar />
            <ChapterFooterSettingBar />
            <ChapterFooterProgress />
            <ChapterFooterCatalog />
        </>
    )
});

export default ChapterFooter;