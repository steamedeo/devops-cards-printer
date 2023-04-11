import WITClient = require("TFS/WorkItemTracking/RestClient");
import Models = require("TFS/WorkItemTracking/Contracts");
import Q = require("q");
const wiCardTemplate = require("./templates/wi-card.handlebars");

const extensionContext = VSS.getExtensionContext();
const client = WITClient.getClient();

interface IQuery {
  id: string;
  isPublic: boolean;
  name: string;
  path: string;
  wiql: string;
}

interface IActionContext {
  id?: number;
  workItemId?: number;
  query?: IQuery;
  queryText?: string;
  ids?: number[];
  workItemIds?: number[];
  columns?: string[];
}

const STATE_COLORS = {
  New: "#B2B2B2",
  "Ready for Analysis": "#009CCC",
  "Under Analysis": "#FBE74B",
  "Ready for Development": "#AE88B9",
  "Ready for SOW": "#5688E0",
  "Under Development": "#5688E0",
  "Ready for Test": "#5688E0",
  "Under Test": "#5688E0",
  Blocked: "#E87025",
  "Ready for Approval": "#5688E0",
  Done: "#339933",
  Removed: "#1D2125",
};

const printWorkItems = {
  getMenuItems: (context: any) => {
    let menuItemText = "Print Physical Card";
    if (context.workItemIds && context.workItemIds.length > 1) {
      menuItemText = "Print Physical Card";
    }

    return [
      {
        action: (actionContext: IActionContext) => {
          const wids = actionContext.workItemIds ||
            actionContext.ids || [actionContext.workItemId || actionContext.id];

          return getWorkItems(wids)
            .then((workItems) => prepare(workItems))
            .then((pages) => {
              return Q.all(pages);
            })
            .then((pages: any) => {
              const workItems = document.createElement("div");
              workItems.setAttribute("class", "container border");
              let wiCardCount = 0;
              pages.forEach((page) => {
                let bugCard: any;
                let userStoryCard: any;
                let taskCard: any;

                wiCardCount++;
                if (page.type !== "processerror") {
                  userStoryCard = wiCardTemplate({
                    number: page.id,
                    style_wiNumber: page.id,
                    work_item_type: page.type,
                    title: page.title,
                    estimate: page.estimate,
                    assigned_to: page.assigned_to,
                    area_path: page.area_path,
                    wave_quarter: page.wave_quarter,
                    product_owner: page.product_owner,
                    iteration_path: page.iteration_path,
                    tags: page.tags,
                    state: page.state,
                    state_color: page.state_color,
                    parent_name: page.parent_name,
                    border_color: page.border_color,
                    icon: page.icon,
                  });
                  workItems.innerHTML += userStoryCard;
                } else {
                  workItems.innerHTML +=
                    "<div> ERROR <br>" + page.message + "</div>";
                }

                if (wiCardCount % 3 === 0 && pages.length > wiCardCount) {
                  workItems.innerHTML +=
                    "<p style='page-break-before: always'><br/>&nbsp;<br/>";
                }
              });
              document.body.appendChild(workItems);

              setTimeout(() => {
                window.focus(); // needed for IE
                let ieprint = document.execCommand("print", false, null);
                if (!ieprint) {
                  (window as any).print();
                }
                workItems.parentElement.removeChild(workItems);
              }, 1000);
            });
        },
        icon: "static/img/print14.png",
        text: menuItemText,
        title: menuItemText,
      } as IContributedMenuItem,
    ];
  },
};

// Promises
function getWorkItems(wids: number[]): IPromise<Models.WorkItem[]> {
  return client.getWorkItems(
    wids,
    undefined,
    undefined,
    Models.WorkItemExpand.All
  );
}

function getWorkItemDefinition(
  thisWorkItem: Models.WorkItem
): IPromise<Models.WorkItemType> {
  return client.getWorkItemType(
    thisWorkItem.fields["System.TeamProject"],
    thisWorkItem.fields["System.WorkItemType"]
  );
}

function getLastPathValue(pathText: string): string {
  if (pathText.length > 0) {
    let pathArray: string[] = pathText.split("\\");
    return pathArray[pathArray.length - 1];
  } else {
    return pathText;
  }
}

function prepare(workItems: Models.WorkItem[]) {
  return workItems.map((item) => {
    let result = {};

    const stateColor = STATE_COLORS[item.fields["System.State"]];

    return getWorkItemDefinition(item)
      .then((thisWIT) => {
        try {
          let template_filled: boolean = false;
          let work_item_color = thisWIT["color"];
          let work_item_icon = thisWIT.icon["url"];
          let tag_val = item.fields["System.Tags"];
          let area_val = getLastPathValue(item.fields["System.AreaPath"]);
          let iteration_val = getLastPathValue(
            item.fields["System.IterationPath"]
          );
          if (item.fields["System.WorkItemType"] === "User Story") {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              id: item.fields["System.Id"],
              estimate: item.fields["Microsoft.VSTS.Scheduling.StoryPoints"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }

          if (item.fields["System.WorkItemType"] === "Product Backlog Item") {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              id: item.fields["System.Id"],
              estimate: item.fields["Microsoft.VSTS.Common.BusinessValue"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }

          if (item.fields["System.WorkItemType"] === "Requirement") {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              id: item.fields["System.Id"],
              estimate:
                item.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }

          if (item.fields["System.WorkItemType"] === "Bug") {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              id: item.fields["System.Id"],
              estimate:
                item.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }

          if (item.fields["System.WorkItemType"] === "Task") {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              description: item.fields["System.Description"],
              id: item.fields["System.Id"],
              estimate:
                item.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }
          if (
            item.fields["System.WorkItemType"] === "Epic" ||
            item.fields["System.WorkItemType"] === "Feature"
          ) {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              description: item.fields["System.Description"],
              id: item.fields["System.Id"],
              estimate: item.fields["Microsoft.VSTS.Scheduling.Effort"],
              assigned_to: item.fields["System.AssignedTo"],
              product_owner: item.fields["Custom.ProductOwnerIVECO"],
              wave_quarter: item.fields["Custom.WAVEQUARTER"],
              area_path: area_val,
              state: item.fields["System.State"],
              state_color: stateColor,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
            template_filled = true;
          }
          if (!template_filled) {
            result = {
              type: item.fields["System.WorkItemType"],
              title: item.fields["System.Title"],
              description: item.fields["System.Description"],
              id: item.fields["System.Id"],
              estimate:
                item.fields["Microsoft.VSTS.Scheduling.OriginalEstimate"],
              assigned_to: item.fields["System.AssignedTo"],
              area_path: area_val,
              iteration_path: iteration_val,
              tags: tag_val,
              border_color: work_item_color,
              icon: work_item_icon,
            };
          }

          let parentId: number;
          for (const relation of item.relations) {
            if (relation.attributes?.name === "Parent") {
              parentId = parseInt(relation.url.split("/").slice(-1)[0]);
              break;
            }
          }

          return parentId ? client.getWorkItem(parentId) : null;
        } catch (e) {
          result = {
            type: "processerror",
            message: e,
          };
          return null;
        }
      })
      .then((parentItem) => {
        // add parent information to result
        if (parentItem) {
          result[
            "parent_name"
          ] = `${parentItem.id} ${parentItem.fields["System.Title"]}`;
        }

        return result;
      });
  });
}

VSS.register(
  `${extensionContext.publisherId}.${extensionContext.extensionId}.print-work-item`,
  printWorkItems
);
