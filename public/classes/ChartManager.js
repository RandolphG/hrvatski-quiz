export class ChartManager {
  constructor(absoluteElementId) {
    const absoluteElement = document.getElementById(absoluteElementId);
    // const relativeElement = document.getElementById(relativeElementId);

    if (!absoluteElement) {
      throw new Error(`Element with id "${absoluteElementId}" not found`);
    }
    /*if (!relativeElement) {
      throw new Error(`Element with id "${relativeElementId}" not found`);
    }*/

    this.absoluteChart = echarts.init(absoluteElement, "dark");
    /* this.relativeChart = echarts.init(relativeElement, "dark");*/ this.dates =
      [];
    this.initializeCharts();
  }

  initializeCharts() {
    this.setAbsoluteChartOptions();
    /*this.setRelativeChartOptions();*/
  }

  setAbsoluteChartOptions() {
    const absoluteOption = {
      title: {
        text: "metrix",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        // Add this to make legend more visible
        top: "15%",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
        name: "results",
      },
      xAxis: {
        type: "category",
        data: this.dates,
        // Add this to handle long date labels
        axisLabel: {
          rotate: 45,
        },
      },
      series: [
        {
          name: "Correct",
          type: "bar",
          // Remove stack property to show bars side by side
          // Or keep it if you want stacked bars
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "wrong",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "evm",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "multisig",
          type: "bar",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
      ],
    };

    this.absoluteChart.setOption(absoluteOption);
  }

  /*setRelativeChartOptions() {
    const relativeOption = {
      title: {
        text: "Proportion of Daily New Addresses",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2);
        },
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
        name: "Ratio",
      },
      xAxis: {
        type: "category",
        data: this.dates,
      },
      series: [
        {
          name: "account",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "placeholder",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "ethaccount",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "evm",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "multisig",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "storageminer",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
        {
          name: "other",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },
          data: [],
        },
      ],
    };

    this.relativeChart.setOption(relativeOption);
  }*/

  updateData(data) {
    // Update dates
    console.log(data);
    this.dates = data.map((item) => item.date);

    // Update absolute chart data
    const absoluteOption = {
      xAxis: {
        data: this.dates,
      },
      series: [
        { data: data.map((item) => item.account) },
        { data: data.map((item) => item.ethaccount) },
        { data: data.map((item) => item.evm) },
        { data: data.map((item) => item.multisig) },
      ],
    };

    // Update relative chart data
    /*const relativeOption = {
      xAxis: {
        data: this.dates,
      },
      series: [
        { data: data.map((item) => item.accountRatio) },
        { data: data.map((item) => item.placeholderRatio) },
        { data: data.map((item) => item.ethaccountRatio) },
        { data: data.map((item) => item.evmRatio) },
        { data: data.map((item) => item.multisigRatio) },
        { data: data.map((item) => item.storageMinerRatio) },
        { data: data.map((item) => item.otherRatio) },
      ],
    };*/

    /* const chartData = {
      title: {
        text: "User Stats",
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },

      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      yAxis: {
        type: "value",
        name: "",
      },

      xAxis: {
        type: "category",
        data: [
          "2023-01-25",
          "2023-01-26",
          "2023-01-27",
          "2023-01-28",
          "2023-01-29",
          "2023-01-30",
          "2023-01-31",
          "2023-02-01",
          "2023-02-02",
          "2023-02-03",
          "2023-02-04",
          "2023-02-05",
          "2023-02-06",
          "2023-02-07",
          "2023-02-08",
          "2023-02-09",
          "2023-02-10",
          "2023-02-11",
          "2023-02-12",
          "2023-02-13",
          "2023-02-14",
          "2023-02-15",
          "2023-02-16",
          "2023-02-17",
          "2023-02-18",
          "2023-02-19",
          "2023-02-20",
          "2023-02-21",
          "2023-02-22",
          "2023-02-23",
          "2023-02-24",
          "2023-02-25",
          "2023-02-26",
          "2023-02-27",
          "2023-02-28",
          "2023-03-01",
          "2023-03-02",
          "2023-03-03",
          "2023-03-04",
          "2023-03-05",
          "2023-03-06",
          "2023-03-07",
          "2023-03-08",
          "2023-03-09",
          "2023-03-10",
          "2023-03-11",
          "2023-03-12",
          "2023-03-13",
          "2023-03-14",
          "2023-03-15",
          "2023-03-16",
          "2023-03-17",
          "2023-03-18",
          "2023-03-19",
          "2023-03-20",
          "2023-03-21",
          "2023-03-22",
          "2023-03-23",
          "2023-03-24",
          "2023-03-25",
          "2023-03-26",
          "2023-03-27",
          "2023-03-28",
          "2023-03-29",
          "2023-03-30",
          "2023-03-31",
          "2023-04-01",
          "2023-04-02",
          "2023-04-03",
          "2023-04-04",
          "2023-04-05",
          "2023-04-06",
          "2023-04-07",
          "2023-04-08",
          "2023-04-09",
          "2023-04-10",
          "2023-04-11",
          "2023-04-12",
          "2023-04-13",
          "2023-04-14",
          "2023-04-15",
          "2023-04-16",
          "2023-04-17",
          "2023-04-18",
          "2023-04-19",
          "2023-04-20",
          "2023-04-21",
          "2023-04-22",
          "2023-04-23",
          "2023-04-24",
        ],
      },

      series: [
        {
          name: "Correct",
          type: "bar",
          stack: "total",
          label: {
            show: false,
          },

          emphasis: {
            focus: "series",
          },

          data: [
            604, 604, 590, 644, 742, 688, 733, 551, 694, 1069, 600, 558, 686,
            658, 735, 1036, 718, 633, 598, 770, 753, 755, 1038, 2181, 1285,
            2321, 1225, 1003, 1063, 988, 823, 814, 823, 795, 797, 1342, 836,
            871, 632, 556, 523, 491, 599, 764, 920, 883, 671, 1035, 937, 763,
            843, 744, 778, 696, 710, 749, 828, 752, 774, 609, 591, 826, 892,
            783, 727, 724, 547, 489, 652, 1429, 578, 752, 749, 525, 450, 725,
            708, 695, 779, 709, 591, 599, 588, 742, 761, 658, 633, 523, 512,
            141,
          ],
        },
        {
          name: "Completed",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 734, 894, 862, 366, 156, 122, 171, 49, 225, 135, 145, 130, 61,
            65, 59, 77, 77, 105, 45, 63, 51, 49, 119, 7164, 186, 41, 41, 4056,
            45, 42, 38, 40, 39, 35, 73, 35, 52, 35, 63, 30, 31, 911,
          ],
        },
        {
          name: "questions",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 4824, 4242, 2031, 893, 693, 465, 530, 581, 432, 638, 220,
            473, 342, 310, 302, 260, 165, 275, 216, 214, 199, 640, 1822, 507,
            7734, 394, 177, 96, 70, 64, 101, 105, 174, 85, 99, 63, 277, 62, 48,
            4067, 113,
          ],
        },
        {
          name: "Errors",
          type: "bar",
          stack: "total",
          emphasis: {
            focus: "series",
          },

          data: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 106, 175, 191, 72, 14, 15, 48, 23, 16, 26, 6, 3, 11, 28, 6, 2,
            24, 24, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 17, 23, 23, 5, 29, 12,
            5, 19, 3, 2, 12, 34, 1, 0,
          ],
        },
      ],
    };*/
    const chartData = {
      title: {
        text: "Metrix",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value.toFixed(2);
        },
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      yAxis: {
        type: "value",
        name: "Count",
      },
      xAxis: {
        type: "category",
        data: [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 3",
          "Week 4",
          "Week 5",
        ], // Simplified for clarity
      },
      series: [
        {
          name: "Correct",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [
            65, 58, 72, 68, 62, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 85, 78, 92,
            88, 82, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14,
          ],
        },
        {
          name: "Incorrect",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [
            65, 58, 72, 68, 62, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 85, 78, 92,
            88, 82, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14,
          ],
        },
        {
          name: "Questions",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [
            45, 38, 52, 48, 42, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 65, 58, 72,
            68, 62, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14,
          ],
        },
        {
          name: "Error",
          type: "bar",
          stack: "total",
          emphasis: { focus: "series" },
          data: [
            45, 38, 52, 48, 42, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14, 45, 38, 52,
            48, 42, 4, 6, 23, 29, 5, 54, 17, 17, 52, 14,
          ],
        },
      ],
    };

    this.absoluteChart.setOption(chartData);
    // this.relativeChart.setOption(relativeOption);
  }

  // Handle window resize
  resize() {
    this.absoluteChart.resize();
    // this.relativeChart.resize();
  }

  // Clean up
  dispose() {
    this.absoluteChart.dispose();
    // this.relativeChart.dispose();
  }
}
