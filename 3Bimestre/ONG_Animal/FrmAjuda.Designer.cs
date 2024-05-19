namespace ONG_Animal
{
    partial class FrmAjuda
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FrmAjuda));
            this.LblAjuda = new System.Windows.Forms.Label();
            this.LblInfoAjuda = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // LblAjuda
            // 
            this.LblAjuda.AutoSize = true;
            this.LblAjuda.Location = new System.Drawing.Point(30, 34);
            this.LblAjuda.Name = "LblAjuda";
            this.LblAjuda.Size = new System.Drawing.Size(37, 13);
            this.LblAjuda.TabIndex = 0;
            this.LblAjuda.Text = "Ajuda:";
            // 
            // LblInfoAjuda
            // 
            this.LblInfoAjuda.AutoSize = true;
            this.LblInfoAjuda.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.LblInfoAjuda.Font = new System.Drawing.Font("Microsoft YaHei UI", 8.25F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.LblInfoAjuda.Location = new System.Drawing.Point(343, 182);
            this.LblInfoAjuda.Name = "LblInfoAjuda";
            this.LblInfoAjuda.Size = new System.Drawing.Size(97, 18);
            this.LblInfoAjuda.TabIndex = 1;
            this.LblInfoAjuda.Text = "NÃO HA AJUDA";
            // 
            // FrmAjuda
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("$this.BackgroundImage")));
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.LblInfoAjuda);
            this.Controls.Add(this.LblAjuda);
            this.Name = "FrmAjuda";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.FrmAjuda_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label LblAjuda;
        private System.Windows.Forms.Label LblInfoAjuda;
    }
}