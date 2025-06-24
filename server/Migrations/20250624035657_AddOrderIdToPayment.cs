using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderIdToPayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payment_order_OrderId",
                table: "payment");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "payment",
                newName: "order_id");

            migrationBuilder.RenameIndex(
                name: "IX_payment_OrderId",
                table: "payment",
                newName: "IX_payment_order_id");

            migrationBuilder.AddForeignKey(
                name: "FK_payment_order_order_id",
                table: "payment",
                column: "order_id",
                principalTable: "order",
                principalColumn: "order_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_payment_order_order_id",
                table: "payment");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "payment",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_payment_order_id",
                table: "payment",
                newName: "IX_payment_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_payment_order_OrderId",
                table: "payment",
                column: "OrderId",
                principalTable: "order",
                principalColumn: "order_id");
        }
    }
}
