using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddNotificationsAndOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_order_issue_issue_id",
                table: "order");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "payment",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "order_status",
                table: "order",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "order_description",
                table: "order",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "issue_id",
                table: "order",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "cost",
                table: "order",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "numeric(10,2)",
                oldPrecision: 10,
                oldScale: 2,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "contractor",
                table: "order",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Priority = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReadDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IssueId = table.Column<int>(type: "integer", nullable: true),
                    OrderId = table.Column<int>(type: "integer", nullable: true),
                    PaymentId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationId);
                    table.ForeignKey(
                        name: "FK_Notifications_issue_IssueId",
                        column: x => x.IssueId,
                        principalTable: "issue",
                        principalColumn: "issue_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Notifications_order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "order",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Notifications_payment_PaymentId",
                        column: x => x.PaymentId,
                        principalTable: "payment",
                        principalColumn: "payment_id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Notifications_useraccount_UserId",
                        column: x => x.UserId,
                        principalTable: "useraccount",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_payment_OrderId",
                table: "payment",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_IssueId",
                table: "Notifications",
                column: "IssueId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_OrderId",
                table: "Notifications",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_PaymentId",
                table: "Notifications",
                column: "PaymentId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_order_issue_issue_id",
                table: "order",
                column: "issue_id",
                principalTable: "issue",
                principalColumn: "issue_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_payment_order_OrderId",
                table: "payment",
                column: "OrderId",
                principalTable: "order",
                principalColumn: "order_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_order_issue_issue_id",
                table: "order");

            migrationBuilder.DropForeignKey(
                name: "FK_payment_order_OrderId",
                table: "payment");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_payment_OrderId",
                table: "payment");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "payment");

            migrationBuilder.AlterColumn<string>(
                name: "order_status",
                table: "order",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "order_description",
                table: "order",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "issue_id",
                table: "order",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<decimal>(
                name: "cost",
                table: "order",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "numeric(10,2)",
                oldPrecision: 10,
                oldScale: 2);

            migrationBuilder.AlterColumn<string>(
                name: "contractor",
                table: "order",
                type: "character varying(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AddForeignKey(
                name: "FK_order_issue_issue_id",
                table: "order",
                column: "issue_id",
                principalTable: "issue",
                principalColumn: "issue_id");
        }
    }
}
