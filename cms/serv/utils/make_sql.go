package utils

import (
	"fmt"
	"strings"

	"github.com/cms/admin/dto/hq"
	"github.com/cms/com"
)
func BuildDynamicQuery(filters []hq.FilterItem, sorts []hq.SortItem, page *com.PageResponse, defaultSortField string) (string, string, []interface{}) {
    var (
        whereClauses []string
        args         []interface{}
    )

    for _, f := range filters {
        switch strings.ToLower(f.Operator) {
        case "=":
            whereClauses = append(whereClauses, fmt.Sprintf("%s = $%d", f.Field, len(args)+1))
            args = append(args, f.Value)

        case ">":
            whereClauses = append(whereClauses, fmt.Sprintf("%s > $%d", f.Field, len(args)+1))
            args = append(args, f.Value)

        case "<":
            whereClauses = append(whereClauses, fmt.Sprintf("%s < $%d", f.Field, len(args)+1))
            args = append(args, f.Value)

        case "like":
            whereClauses = append(whereClauses, fmt.Sprintf("%s LIKE $%d", f.Field, len(args)+1))
            args = append(args, "%"+fmt.Sprint(f.Value)+"%")

        case "in":
            whereClauses = append(whereClauses, fmt.Sprintf("%s = ANY($%d)", f.Field, len(args)+1))
            args = append(args, f.Value)


        }
    }

    var fullWhere = ""

    if len(whereClauses) > 0 {
        fullWhere += " WHERE " + strings.Join(whereClauses, " AND ")
    }

	var where = fullWhere
    // Sorting
    if len(sorts) > 0 {
        var orderClauses []string
        for _, s := range sorts {
            dir := "ASC"
            if strings.ToLower(s.Order) == "desc" {
                dir = "DESC"
            }
            orderClauses = append(orderClauses, fmt.Sprintf("%s %s", s.Field, dir))
        }
        fullWhere += " ORDER BY " + strings.Join(orderClauses, ", ")
    } else{
		fullWhere += fmt.Sprintf(" ORDER BY %s DESC  NULLS LAST", defaultSortField)
	}

	fullWhere += fmt.Sprintf(" LIMIT %d OFFSET %d;", page.GetLimit(), page.GetOffset())

    return where, fullWhere, args
}
