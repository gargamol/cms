<template>
  <div>
    <h3>Layout Editor</h3>
    <Grid :grid="page.primaryLayout" :updateGrid="updateGrid"> </Grid>
  </div>
</template>

<script>
module.exports = {
  methods: {
    updateGrid: function (newGrid) {
      this.page.primaryLayout = newGrid;
    },
  },
  data: function () {
    return {
      page: {
        primaryLayout: {
          rows: [
            {
              columns: [
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'leaderboard_1',
                      },
                    },
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'leaderboard_1',
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_2',
              columns: [
                {
                  blocks: [
                    {
                      type: 'featured_content',
                      settings: {
                        filter_mode: 'manual',
                        content: '21157337',
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual',
                        content: ['21157305', '21157250', '21157302', '21157294'],
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_1_1',
              columns: [
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Latest',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'automatic',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'rail_2',
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Sponsored Content',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'automatic',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        filter_option: 'sponsored',
                        number_of_items: 4,
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_1_1',
              columns: [
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Tactical',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56179',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Training & Careers',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56208',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'On the Street',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56221',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
              ],
            },
            {
              columns: [
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Videos',
                        image_position: 'above',
                        show_summary: 'false',
                        filter_mode: 'automatic',
                        filter_content_types: ['video'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_2',
              columns: [
                {
                  blocks: [
                    {
                      type: 'leading_companies',
                      settings: {
                        heading_background_color: '#005ea0',
                        heading_text: '<p>BROWSE THESE</p><p><b>LEADING COMPANIES</b></p>',
                        heading_text_color: '#ffffff',
                        all_companies_link: '/leaders',
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'rail_1',
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_1_1',
              columns: [
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Investigations',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56341',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Command/HQ',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56374',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'content_list',
                      settings: {
                        title: 'Honoring the Fallen',
                        image_position: 'right',
                        show_summary: 'true',
                        filter_mode: 'manual_section',
                        section: '56401',
                        filter_content_types: ['article', 'blog', 'whitepaper'],
                        number_of_items: 4,
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_1_1',
              columns: [
                {
                  blocks: [
                    {
                      type: 'issue_cover',
                      settings: {
                        title: 'Law Enforcement Technology',
                        magazine: '53f6823928ed57018875bb53',
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'rail_2',
                      },
                    },
                  ],
                },
                {
                  blocks: [
                    {
                      type: 'issue_cover',
                      settings: {
                        title: 'Law Inforcement Product News',
                        magazine: '53f6824228ed57018875bb59',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        secondaryLayout: {
          content_types: ['article', 'blog', 'whitepaper'],
          rows: [
            {
              layout: '2_1',
              columns: [
                {
                  type: 'content_list',
                  settings: {
                    image_position: 'above',
                    show_summary: 'true',
                    number_of_items: 2,
                  },
                },
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'load_more_1',
                      },
                    },
                  ],
                },
              ],
            },
            {
              columns: [
                {
                  type: 'content_list',
                  settings: {
                    image_position: 'above',
                    show_summary: 'true',
                    number_of_items: 3,
                  },
                },
              ],
            },
            {
              layout: '2_1',
              columns: [
                {
                  type: 'content_list',
                  settings: {
                    image_position: 'above',
                    show_summary: 'true',
                    number_of_items: 2,
                  },
                },
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'load_more_1',
                      },
                    },
                  ],
                },
              ],
            },
            {
              layout: '1_2',
              columns: [
                {
                  blocks: [
                    {
                      type: 'gam_ad',
                      settings: {
                        ad_unit_pattern: 'load_more_2',
                      },
                    },
                  ],
                },
                {
                  type: 'content_list',
                  settings: {
                    image_position: 'right',
                    show_summary: 'true',
                    number_of_items: 4,
                  },
                },
              ],
            },
          ],
        },
      },
    };
  },
};
</script>
