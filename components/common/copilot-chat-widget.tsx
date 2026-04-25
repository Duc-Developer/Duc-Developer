
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCopilotReadable } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';

import { getSummary } from '@/services/blogs';
import { Entry, ResponseData as BlogSummaryResponse } from '@/pages/api/blogs/davidBlogSummary';

const BLOG_SUMMARY_LIMIT = 50;

const CopilotChatWidget = () => {
    // const { data: blogSummary } = useQuery<BlogSummaryResponse>({
    //     queryKey: ['copilot-blog-summary', BLOG_SUMMARY_LIMIT],
    //     queryFn: () => getSummary({ limit: BLOG_SUMMARY_LIMIT }),
    // });

    // const blogEntries = useMemo(
    //     () => blogSummary?.data?.feed?.entry?.map((entry: Entry) => ({
    //         title: entry.title.$t,
    //         summary: entry.content.$t,
    //         publishedAt: entry.published.$t,
    //         updatedAt: entry.updated.$t,
    //         url: entry.link.find((item) => item.rel === 'alternate')?.href ?? '',
    //         categories: entry.category?.map((item) => item.term) ?? [],
    //     })) ?? [],
    //     [blogSummary?.data?.feed?.entry]
    // );

    // useCopilotReadable({
    //     description: 'Danh sách bài viết blog của David. Hãy ưu tiên dùng dữ liệu này khi người dùng hỏi về blog, bài viết, nội dung, chủ đề, hoặc kinh nghiệm của David.',
    //     value: {
    //         total: blogEntries.length,
    //         entries: blogEntries,
    //     },
    // }, [blogEntries]);

    return (
        <CopilotPopup
            defaultOpen={false}
            hitEscapeToClose
            clickOutsideToClose
            labels={{
                title: 'Travis Assistant',
                initial: 'Xin chào, tôi có thể hỗ trợ gì cho bạn hôm nay?',
                placeholder: 'Nhập câu hỏi của bạn...',
            }}
            // suggestions={[
            //     {
            //         title: 'Tóm tắt blog của David',
            //         message: 'Hãy tóm tắt các bài viết nổi bật gần đây trên blog của David.',
            //     },
            //     {
            //         title: 'Bài viết về React',
            //         message: 'Trong dữ liệu blog của David có những bài viết nào liên quan tới React?',
            //     },
            // ]}
        />
    );
};

export default CopilotChatWidget;
